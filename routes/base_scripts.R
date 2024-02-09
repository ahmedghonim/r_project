

source("./loadDB.R")
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
  percent_group<-df%>% filter(change_group==2) %>% rename(preMean=Mean, preSD=SD) %>%
                                                            mutate(postMean=preMean * percent_change , postSD=preSD  * percent_change)
  
  
  #arrange studies with groups
  
  #Raise an error if unequal number of studies
  assertthat::are_equal(nrow(pre_group),
                        nrow(post_group))
  
  return(
    rbind(
      cbind(pre_group,postMean=post_group$postMean, postSD=post_group$postSD),
        percent_group
      )
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
  
  ccoef=calc_CCoef(prepared_df)
  
  out<-prepared_df%>%mutate(changeMean=postMean-preMean,
                            changeSD=sqrt(preSD^2+postSD^2 - 2*preSD*postSD*ccoef),
                            CC=ccoef)
  #remove change(Mean, SD) and make a storage version of out
  return(out)
  
}

calculate_prop<-function(df){
  m.prop<-metaprop(N,N_total,studlab = Study_ID ,df, sm = "PAS")
  df$TE=m.prop$TE
  df$seTE=m.prop$seTE
  return  (df)
  
  
}

prepare_groups<-function(df, data_type){
  
  
  #data_type 0:binary  1:continuous
  if(data_type){
    group1<-df%>% filter(group_ID==1) %>% rename(Mean1=Mean, SD1=SD, N1=N)
    group2<-df%>% filter(group_ID==2) %>% rename(Mean2=Mean, SD2=SD, N2=N) %>%select(Mean2, SD2, N2)
  }
  else{
    group1<-df%>% filter(group_ID==1) %>% rename(N1=N, total1=N_total)
    group2<-df%>% filter(group_ID==2) %>% rename(N2=N, total2=N_total) %>%select(N2, total2)
  }
  #arrange studies with groups
  
  #Raise an error if unequal number of studies
  assertthat::are_equal(nrow(group1),
                        nrow(group2))
  
  return(
    cbind(group1, group2)
  )
}

calculate_bin<-function(df){
  df<-prepare_groups(df,0)
  m.bin<-metabin(N1, total1,
                 N2, total2,
                 df, incr = "TACC",studlab = Study_ID)
  df$TE=m.bin$TE
  df$seTE=m.bin$seTE
  df<-df%>%select(ID, Study_ID, TE, seTE,invalid, func)
  return(df)
  
}

calculate_cont<-function(df){
  df<-prepare_groups(df,1)
  m.cont<-metacont(N1,Mean1,SD1,
                   N2,Mean2,SD2,
                   studlab = Study_ID  ,df)
  df$TE=m.cont$TE
  df$seTE=m.cont$seTE
  df<-df%>%select(ID, Study_ID, TE, seTE,invalid, func)
  return(df)  
  
}


combine_MeanSD<-function(df){

  
  
  df<-df%>%group_by(Study_ID)
  study_id<-df%>%group_by(Study_ID)%>%group_keys()
  IDs<-do.call("rbind",df%>%group_map(~head(.x,1L)))%>%select(ID)
  df<-df%>%group_split()
  df<-lapply(df, function(x) tail(sample.decomp(n=x$N,sample.mean = x$Mean,sample.sd = x$SD, include.sd = TRUE), 1)%>%select(!sample.var))
  df<-cbind(IDs, study_id, do.call("rbind",df)) %>% rename(N=n, Mean=sample.mean, SD=sample.sd) %>%
                                                                        mutate(invalid=0, func="combine_MeanSD")
  rownames(df)<-NULL
  return(df)
}




Validate_requirements<-function(funcIDs, df, mandatory, pp){
  #Check whether each entry satisfies the mandatory inputs
  #assign the proper function ID to valid entries
  
  df<-df%>%mutate(invalid=0, func="")
  available_funcs<-mandatory[funcIDs,]%>% select(1,8:ncol(mandatory))
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

IPD_MeanSD<-function(df){
  output_df<-cbind(ID=c(1),df%>%summarise(Mean=mean(patient_data),
                            SD=sd(patient_data)),N=nrow(df))
  return(output_df)
}
unit_convert<-function(x,unit){
  if(!is.na(as.numeric(unit))){
    return(x*unit)
  }
  else{
  return(
    x
  )}
}

char_cols<-df_names%>%filter(type=="char")
char_cols<-char_cols$internal

#' Convert Standard error and sample size into Standard Deviation
#' @post /Task_manager
#' @param df JSON object of The dataframe containing user input
#' @param funcIDs JSON object of the indices of valid functions in mandatory_inputs
#' @param current_outputs JSON object of The outputs of current funcIDs
#' @param current_prepost Whether there's prepost data
#' @param category category of operations
#' @return JSON object containing final result of the api call
#' @serializer json list(na="string")
Task_manager<-function( df, funcIDs, current_outputs, current_prepost, category ){
  #make sure output columns exist in data // pre-processing step

  df<-fromJSON(df)
  df<-df%>%filter(if_all(everything(), ~ !is.na(.x) ))
  
  #find a better way to exclude string variables
  if("Study_ID" %in% colnames(df)){
    
    
  df<-cbind(df%>%select(all_of(char_cols)),
            df%>%select(!any_of(char_cols))%>%mutate_all(as.numeric)%>%rowwise())
  }
  else{
    df<-df%>%mutate_all(as.numeric)
  }
  if("labs" %in% colnames(df)){
    df<-df%>%mutate(labs=ifelse(!is.na(labs), Labs$ratio[labs], labs))
    df<-df%>%select(!any_of(char_cols))%>%rowwise()%>%
      mutate(across(everything(),~ unit_convert(.,labs)))%>%select(-labs)
  }
  mandatory_inputs<-mandatory
  funcIDs<-fromJSON(funcIDs)
  current_outs<-as.vector(fromJSON(current_outputs))
  output_placeholder_indices<-match(current_outs,colnames(df))
  current_prepost<-fromJSON(current_prepost)
  c<-fromJSON(category)
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
  
  validated_df<-Validate_requirements(funcIDs, df, mandatory_inputs, current_prepost)%>%rowid_to_column("ID")
  
  valid_rows<-validated_df%>%filter(invalid==0)
  ready_rows<-validated_df%>%filter_at(vars(current_outs), all_vars(!is.na(.))) %>% filter(!(ID %in% valid_rows$ID))
  invalid_rows<-validated_df%>%filter(invalid!=0 ,  !(ID %in% ready_rows$ID))
  if (c ==1){
    for(v in 1:nrow(valid_rows)){
    
         valid_rows[v,]<-do.call(valid_rows$func[v], list(valid_rows[v,]))
      
    }

  }
  else if(c == 2){
    grouped_rows<-valid_rows%>%group_by(func)%>%group_split()
    grouped_rows<-lapply(grouped_rows, function(df) do.call(df$func[1], list(df)))
    valid_rows<-do.call("rbind", grouped_rows)
    ready_rows<-ready_rows%>%select(ID, Study_ID, TE, seTE,invalid, func)
    invalid_rows<-invalid_rows%>%select(ID, Study_ID, TE, seTE,invalid, func)
  }
  else if(c==3){
    
    valid_rows<-combine_MeanSD(valid_rows)
  }
  else if(c==4){
  
    valid_rows<-IPD_MeanSD(valid_rows)
    ready_rows<-ready_rows%>%select(ID,Mean, SD, N)
    invalid_rows<-invalid_rows%>%select(ID, Mean, SD, N)
  }
  output_df<-rbind(ready_rows,valid_rows, invalid_rows)%>%arrange(ID)
  if(current_prepost && "change_group" %in% colnames(output_df)){
    output_df<-PrePost_to_MeanSD(output_df)
  }

  return(output_df)
  
}



