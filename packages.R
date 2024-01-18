if(!require("jsonlite")){
  install.packages("jsonlite")
  library(jsonlite)
}
if(!require("dplyr")){
  install.packages("dplyr")
  library(dplyr)
}
if(!require("remotes")){
  install.packages("remotes")
  library(remotes)
}
if(!require("uxstats")){
  remotes::install_github("darrellpenta/uxstats")
  library(uxstats)
}
if(!require("devtools")){
  install.packages("devtools")
  library(devtools)
}
if(!require("utilities")){
  install_version("utilities", version = "0.6.1", repos = "http://cran.us.r-project.org")
  library(utilities)
}



