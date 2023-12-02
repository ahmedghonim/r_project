library(plumber)
library(dplyr)
library(jsonlite)
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


#' Convert Standard error and sample size into Standard Deviation
#' @post /SE_N_to_SD
#' @param df JSON object of The dataframe containing SE and N
#' @return JSON object containing SD added to the original data
#' @serializer json
function(df){
  df<-fromJSON(df)
  out<-df%>%
    mutate(SD=SE*sqrt(N))
  
  return(out)
}
