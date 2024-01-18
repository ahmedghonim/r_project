if(!require("jsonlite")){
  install.packages("jsonlite")
  library(jsonlite)
}
if(!require("tidyverse")){
  install.packages("tidyverse")
  library(tidyverse)
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
if(!require("DBI")){
  install.packages("DBI")
  library(DBI)
}
if(!require("readxl")){
  install.packages("readxl")
  library(readxl)
}

if(!require("RSQLite")){
  install.packages("RSQLite")
  library(RSQLite)
}


