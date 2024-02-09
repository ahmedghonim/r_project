library(plumber)
library(tidyverse)
library(uxstats)
library(jsonlite)
library(DBI)
library(readxl)
library(openxlsx)
library(meta)
library(utilities)
options("plumber.port" = 8000)
#* @apiTitle Statistical Analysis
#* @apiDescription This is a sample server for a Meta-analysis.
#* @apiTOS http://example.com/terms/
#* @apiContact list(name = "API Support", url = "http://www.example.com/support", email = "support@example.com")
#* @apiLicense list(name = "Apache 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0.html")
#* @apiVersion 1.0.1



#* Log information about the incoming request
#* @filter logger
function(req){
  cat(as.character(Sys.time()), "-",
      req$REQUEST_METHOD, req$PATH_INFO, "-",
      req$HTTP_USER_AGENT, "@", req$REMOTE_ADDR,  "\n")
  print(req$QUERY_STRING)
  plumber::forward()
}



#* Return available categories
#' @return JSON object of available categories and their IDs
#' @serializer json
#* @get /api/available_categories
function(){
  return(categories%>%select(ID, Name))
}


#* Return available lab conversions
#' @return JSON object of available lab conversions and their IDs
#' @serializer json
#* @get /api/labs
function(){
 return(Labs%>%select(ID, Conversion))
}





#' this is a test for api
#' @post /api/post_message
#' @param date The date parameter (format: "YYYY-MM-DD")
#' @param message The message parameter
#' @return JSON object with the provided date and message
#' @serializer json
function(date, message) {
  response <- list(date = date, message = message)
  return(response)
}


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
#' @post /api/Rename_variables
#' @param var_names column names to be renamed
#' @param current_groups The number of current groups
#' @param current_prepost Whether there's prepost data
#' @return JSON object containing old & new names
#' @serializer json list(na="string")
function(var_names, current_groups, current_prepost){
  
  
  inputs<-fromJSON(var_names)

  
  pp<-current_prepost
  n=current_groups
  
  g1=ifelse(n==1,1,0)
  g2=ifelse(n==2,1,0)
  g3=ifelse(n>2,1,0)
  
  neutral_names<-df_names%>%filter( is.na(`prepost`), is.na(`group_1`), is.na(`group_2`),  is.na(`group_3.`) )
  
  variable_names<-df_names%>%filter(`prepost`== pp,`group_1` == g1, `group_2` == g2, `group_3.`== g3)
  
  final_names<-rbind(variable_names, neutral_names) %>% arrange(ID)
  
  inds<-match(inputs,final_names$internal)
  return (final_names$ui[inds])
  
}


#' check eligible functions for given groups and prepost
#' @post /api/eligible_functions
#' @param category category of operations
#' @param current_groups The number of current groups
#' @param current_prepost Whether there's prepost data
#' @return JSON object containing Available Input parameters for all eligible functions
#' @serializer json list(na="string")
function(current_groups, current_prepost, category){
  pp<-fromJSON(current_prepost)
  n=fromJSON(current_groups)
  c<-fromJSON((category))
  
  g1=ifelse(n==1,1,0)
  g2=ifelse(n==2,1,0)
  g3=ifelse(n>2,1,0)
  
  eligible_functions<-mandatory%>%filter(`group_1` == g1, `group_2` == g2, `group_3.`== g3, category == c) %>% select(`ID`,`Function`)
  
  inds=match(eligible_functions$`Function`,available$`Function`)
  

  
  final_df<-available[inds,]
  inputs<-colnames(
    final_df%>%
      select(2:ncol(final_df)) %>%
      select(which(colSums(.)>0))
  )
  types<-df_names$type[match(inputs,df_names$internal)]
  Renamed_vars<-Rename_variables(inputs, df_names, n, pp)
  
  return(
    list(Renamed_vars,
         eligible_functions$ID, types)
  )
  
}  



#' Check if user inputs satisfies mandatory functions' parameters
#' @post /api/Func_IDs
#' @param input_params JSON object of The IDs from eligible_functions
#' @param user_inputs JSON object of The dataframe containing user-chosen input variables
#' @serializer json list(na="string")
function(input_params, user_inputs){
  funcs<-fromJSON(input_params)
  outs<-fromJSON(user_inputs)
  output<- output_df
  available_funcs<-mandatory[funcs,]%>% select(1,8:ncol(mandatory))
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
#' @post /api/Output_variables
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






cors <- function(req, res) {
  
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200 
    return(list())
  } else {
    plumber::forward()
  }
  
}

#' @plumber
function(pr) {
  

      
 
    
  pr %>% pr_hook("preroute",cors) %>% 
    pr_mount("/api/scripts", plumb("./routes/base_scripts.R")) 
}



#Filters




