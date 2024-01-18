library(plumber)
library(tidyverse)
library(uxstats)
library(jsonlite)
library(DBI)
library(readxl)

mydb <- dbConnect(RSQLite::SQLite(), "globals.sqlite")

# Create db from globals.xlsx
# available <- read_excel("globals.xlsx",
#                                sheet = "Input") %>%
#   mutate(
#     across(everything(), ~replace_na(.x, 0))
#   )
# mandatory <- read_excel("globals.xlsx",
#                                sheet = "Mandatory") %>%
#   mutate(
#     across(everything(), ~replace_na(.x, 0))
#   ) %>% rowid_to_column(var="ID")
# output_df <- read_excel("globals.xlsx",
#                                 sheet = "Output")%>%
#   mutate(
#     across(everything(), ~replace_na(.x, 0))
#   )
# 
# df_names <- read_excel("globals.xlsx",
#                              sheet = "Names") %>% rowid_to_column(var="ID")
# 
# dbWriteTable(mydb, "available", available)
# dbWriteTable(mydb, "mandatory", mandatory)
# dbWriteTable(mydb, "output_df", output_df)
# dbWriteTable(mydb, "df_names", df_names)

available<- dbReadTable(mydb, "available")
mandatory <- dbReadTable(mydb, "mandatory")
output_df <- dbReadTable(mydb, "output_df")
df_names <- dbReadTable(mydb, "df_names")

#* get the status of the api
#* @get /health-check
status <- function(){
  list(
    status = "API Is Runing "
  )
}




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

  ccoef=calc_CCoef(prepared_df)
  
  out<-prepared_df%>%mutate(changeMean=postMean-preMean,
                            changeSD=sqrt(preSD^2+postSD^2 - 2*preSD*postSD*ccoef),
                            CC=ccoef)
  #remove change(Mean, SD) and make a storage version of out
  return(out)
  
}

calculate_prop<-function(df){
  m.prop<-metaprop(N,N_total,studlab = Study_ID ,df)
  return  (cbind(df, TE=m.prop$TE,seTE=m.prop$seTE) )
  
  
}

prepare_groups<-function(df, data_type){
  
  
  #data_type 0:binary  1:continuous
  if(data_type){
    group1<-df%>% filter(group_ID==1) %>% rename(Mean1=Mean, SD1=SD, N1=N)
    group2<-df%>% filter(group_ID==2) %>% rename(Mean2=Mean, SD2=SD, N2=N)
  }
  else{
    group1<-df%>% filter(group_ID==1) %>% rename(N1=N, total1=N_total)
    group2<-df%>% filter(group_ID==2) %>% rename(N2=N, total2=N_total)
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
  
  #return  (cbind(df, TE=m.bin$TE,seTE=m.bin$seTE) )
  return(df)
  
}

calculate_cont<-function(df){
  df<-prepare_groups(df,1)
  m.cont<-metacont(N1,Mean1,SD1,
                   N2,Mean2,SD2,
                   studlab = studlab ,df)
  
  return  (cbind(df, TE=m.cont$TE,seTE=m.cont$seTE) )
  
  
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
#' @param funcIDs JSON object of the indices of valid functions in mandatory_inputs
#' @param current_outputs JSON object of The outputs of current funcIDs
#' @param current_prepost Whether there's prepost data
#' @return JSON object containing final result of the api call
#' @serializer json list(na="string")
Task_manager<-function( df, funcIDs, current_outputs, current_prepost ){
  #make sure output columns exist in data // pre-processing step

    df<-fromJSON(df)
    mandatory_inputs<-mandatory
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









#Filters


Rename_variables<-function(input_params, df_names, current_groups, current_prepost){
  
  
  inputs<-input_params
  df_names<-df_names
  
  pp<-current_prepost
  n=current_groups
  
  g1=ifelse(n==1,1,0)
  g2=ifelse(n==2,1,0)
  g3=ifelse(n>2,1,0)
  
  neutral_names<-df_names%>%filter( is.na(`prepost`), is.na(`group_1`), is.na(`group_2`),  is.na(`group_3.`) )
  
  variable_names<-df_names%>%filter(`prepost`== pp,`group_1` == g1, `group_2` == g2, `group_3.`== g3)
  
  final_names<-rbind(variable_names, neutral_names) %>% arrange(ID)
  
  inds<-match(inputs,final_names$internal)
  return (rbind(inputs,final_names$ui[inds]))
  
}

#' check eligible functions for given groups and prepost
#' @post /eligible_functions
#' @param current_groups The number of current groups
#' @param current_prepost Whether there's prepost data
#' @return JSON object containing Available Input parameters for all eligible functions
#' @serializer json list(na="string")
function(current_groups, current_prepost){

  pp<-fromJSON(current_prepost)
  n=fromJSON(current_groups)
  
  g1=ifelse(n==1,1,0)
  g2=ifelse(n==2,1,0)
  g3=ifelse(n>2,1,0)
  
  eligible_functions<-mandatory%>%filter(`prepost`== pp,`group_1` == g1, `group_2` == g2, `group_3.`== g3) %>% select(`ID`,`Function`)
  
  inds=match(eligible_functions$`Function`,available$`Function`)
  
  eligible_functions$ID
  
  final_df<-available[inds,]
  inputs<-colnames(
    final_df%>%
      select(2:ncol(final_df)) %>%
      select(which(colSums(.)>0))
  )
  
  Renamed_vars<-Rename_variables(inputs, df_names, n, pp)
  
  return(
    list(Renamed_vars,
         eligible_functions$ID)
  )
  
}  



#' Check if user inputs satisfies mandatory functions' parameters
#' @post /Func_IDs
#' @param input_params JSON object of The IDs from eligible_functions
#' @param user_inputs JSON object of The dataframe containing user-chosen input variables
#' @serializer json list(na="string")
function(input_params, user_inputs){
  funcs<-fromJSON(input_params)
  outs<-fromJSON(user_inputs)
  output<- output_df
  
  available_funcs<-mandatory[funcs,]%>% select(1,7:ncol(mandatory))
  available_funcs<- available_funcs %>%  rowwise() %>% 
    mutate(original=sum( c_across(2: ncol(available_funcs) ) ), current=0 )
  cols<- match(outs, colnames(available_funcs))
  
  for (i in 1:nrow(available_funcs)) {
    row<-available_funcs[i,]
    
    available_funcs$current[i]=sum(as.numeric(row[cols]) & rep(1, length(outs)))
    
  }
  
  
  final_iDs<-unlist(available_funcs %>% filter(original== current) %>% select(ID))
  
  return(list(mandatory$`Function`[final_iDs],final_iDs))
  
}  



#' Check available outputs of given function IDs given be Func_IDs
#' @post /Output_variables
#' @param funcIDs JSON object for IDs from Func_IDs
#' @return JSON object containing output variables
#' @serializer json list(na="string")
function(funcIDs){
  
  final_iDs<-fromJSON(funcIDs)
  output<- output_df
  
  out_iDs<-match(mandatory$`Function`[final_iDs],output$`Function`)
  
  
  return(
    list(
      colnames(
        output[out_iDs,]%>%
          select(2:ncol(output)) %>%
          select(which(colSums(.)>0))
      )
    )
  )
  
}   


