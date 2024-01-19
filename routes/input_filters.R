source("loadDB.R")


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
