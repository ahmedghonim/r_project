library(plumber)

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

