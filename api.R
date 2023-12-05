library(plumber)
library(tidyverse)
library(uxstats)
library(jsonlite)


#* get the status of the api
#* @get /health-check
status <- function(){
  list(
    status = "API Is Runing "
  )
}

#[1,4,7,10] 
#[{"Study":"dfsf","Mean":56,"SD":"NA","SE":5,"N":45,"Median":"NA","q1":"NA","q3":"NA","min":"NA","max":"NA","upper":"NA","lower":"NA"}] 


#' this is a test for api
#' @post /post_message
#' @param date The date parameter (format: "YYYY-MM-DD")
#' @param message The message parameter
#' @return JSON object with the provided date and message
#' @serializer json
function(date, message) {
  response <- list(date = date, message = message)
  return(response)
}

Ci_N_to_SD<-function(df){
  
  ci<-0.95
  if("CI%" %in% colnames(df)){
    ci<-ifelse(is.na(df$`CI%`),0.95,df$`CI%`[1])
  }
  out<-df%>%
    mutate(SD=sqrt(N) * (ulci-llci) / ifelse(N>=100, 3.92, 2*tinv(1-ci,N-1) ) )
  
  return(out)
}

SE_N_to_SD<-function(df){
  out<-df%>%
    mutate(SD=SE*sqrt(N))
  
  return(out)
}

MedianIQ_to_MeanSD<-function(df){
  out<-df%>%
    mutate(Mean=(0.7+0.39/N)*0.5*(q1+q3)+(0.3-0.39/N)*Median)%>%
    mutate(SD=(q3-q1)/(2*qnorm((0.75*N-0.125)/(N+0.25),0,1)))
  
  return(out)
}

MedianRng_to_MeanSD<-function(df){
  out<-df%>%
    mutate(Mean= 2/(4+N^0.75)*(min+max) + N^0.75/(4+N^0.75)*Median)%>%
    mutate(SD=(max-min)/(2*qnorm((N-0.375)/(N+0.25),0,1)))
  
  return(out)
}

Pval_2N_to_SD<-function(df){
  out<-df%>%
    mutate(SD= (Mean/uxstats::tinv(pval,N1+N2-2))/sqrt(1/N1+1/N2))
  
  return(out)
}

Ci_2N_to_SD<-function(df){
  ci<-0.95
  if("CI%" %in% colnames(df)){
    ci<-ifelse(is.na(df$`CI%`),0.95,df$`CI%`[1])
  }
  out<-df%>%
    mutate(SD=((ulci-llci)/ifelse(N1+N2>=100,3.92,uxstats::tinv(1-ci,N1+N2-2)*2))/sqrt(1/N1+1/N2))
  
  return(out)
}

SE_2N_to_SD<-function(df){
  out<-df%>%
    mutate(SD=SE/sqrt(1/N1+1/N2))
  
  return(out)
}

prepare_prepost<-function(df){
  
  
  #change_group=0 ->Pre, change_group=1 ->Post
  pre_group<-df%>% filter(change_group==0) %>% rename(preMean=Mean, preSD=SD)
  post_group<-df%>% filter(change_group==1) %>% rename(postMean=Mean, postSD=SD)
  
  #arrange studies with groups
  
  #Raise an error if unequal number of studies
  assertthat::are_equal(nrow(pre_group),
                        nrow(post_group))
  
  return(
    cbind(pre_group,postMean=post_group$postMean, postSD=post_group$postSD)
  )
}

calc_CCoef<-function(df){
  cc_def<-0.5
  ccoef<-data.frame()
  change_sd<-data.frame()
  if("ccoef" %in% colnames(df))
  { 
    ccoef<-df%>%filter(!is.na(`ccoef`))
  }
  else if("changeSD" %in% colnames(df))
  {  
    change_sd<-df%>%filter(!is.na(changeSD),!is.na(preSD),!is.na(postSD))
  }
  if(nrow(ccoef)){
    cc_def<-mean(ccoef$CC)
  }
  else if(nrow(change_sd)){
    change_sd<-change_sd%>%mutate(CC=(preSD^2+postSD^2-changeSD^2)/(2*preSD*postSD))
    cc_def<-mean(change_sd$CC)
  }
  
  return(cc_def)
}


PrePost_to_MeanSD<-function(df){
  #change into pre, post Means and SDs
  prepared_df<-prepare_prepost(df)
  browser()
  ccoef=calc_CCoef(prepared_df)
  
  out<-prepared_df%>%mutate(changeMean=postMean-preMean,
                            changeSD=sqrt(preSD^2+postSD^2 - 2*preSD*postSD*ccoef),
                            CC=ccoef)
  #remove change(Mean, SD) and make a storage version of out
  return(out)
  
}




Validate_requirements<-function(funcIDs, df, mandatory){
  #Check whether each entry satisfies the mandatory inputs
  #assign the proper function ID to valid entries

  df<-df%>%mutate(invalid=0, func="")
  available_funcs<-mandatory[funcIDs,]%>% select(1,7:ncol(mandatory))
  available_funcs<- available_funcs %>%  rowwise() %>% 
    mutate(original=sum( c_across(2: ncol(available_funcs) ) ), current=0 )
  
  
  for (v in 1:nrow(df)){
    df_row<-df[v,] %>% select(!invalid)
    df_row<-df_row%>%select_if(function(x) x!=""  &!is.na(x))
    for (i in 1:nrow(available_funcs)) {
      row<-available_funcs[i,]
      col_inds<-match(colnames(df_row),colnames(available_funcs))
      available_funcs$current[i]=sum(rep(1, length(df_row))& as.numeric(row[col_inds]) )
      
    }
    
    eligible<-available_funcs%>%filter(current==original)
    ifelse(nrow(eligible), df$func[v]<-mandatory$`Function`[eligible$`ID`[1]], df$invalid[v]<-1)
    available_funcs<-available_funcs%>%mutate(current=0)
  }
  
  return(df)
}

#' Convert Standard error and sample size into Standard Deviation
#' @post /Task_manager
#' @param df JSON object of The dataframe containing user input
#' @param mandatory_inputs JSON object of the inputs requireds for every function
#' @param funcIDs JSON object of the indices of valid functions in mandatory_inputs
#' @param current_outputs JSON object of The outputs of current funcIDs
#' @param current_prepost Whether there's prepost data
#' @return JSON object containing final result of the api call
#' @serializer json list(na="string")
Task_manager<-function( df, mandatory_inputs, funcIDs, current_outputs, current_prepost ){
  #make sure output columns exist in data // pre-processing step

    df<-fromJSON(df)
    mandatory_inputs<-fromJSON(mandatory_inputs)
    funcIDs<-fromJSON(funcIDs)
    current_outs<-as.vector(fromJSON(current_outputs))
    output_placeholder_indices<-match(current_outs,colnames(df))
    current_prepost<-fromJSON(current_prepost)
    
    old_colnames<-colnames(df)
    
    if(sum(is.na(output_placeholder_indices))){
      for(out in 1:length(output_placeholder_indices)){
        
        if(is.na(output_placeholder_indices[out])){
          df<-cbind(
            rep(NA,nrow(df)),
            df
          )
        }
        
      }
      colnames(df)<-c(current_outs[is.na(output_placeholder_indices)], old_colnames)
    }
    
    validated_df<-Validate_requirements(funcIDs, df, mandatory_inputs)%>%rowid_to_column("ID")
    
    
    ready_rows<-validated_df%>%filter_at(vars(current_outs), all_vars(!is.na(.)))
    valid_rows<-validated_df%>%filter(invalid==0)
    invalid_rows<-validated_df%>%filter(invalid!=0 ,  !(ID %in% ready_rows$ID))
    for(v in 1:nrow(valid_rows)){
      valid_rows[v,]<-do.call(valid_rows$func[v], list(valid_rows[v,]))
    }
    
    output_df<-rbind(ready_rows,valid_rows,invalid_rows)%>%arrange(ID)
    
    if(current_prepost){
      output_df<-PrePost_to_MeanSD(output_df)
    }
    
    
    return(output_df)

}
