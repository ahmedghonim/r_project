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
  install.packages("https://cran.r-project.org/src/contrib/Archive/utilities/utilities_0.6.1.tar.gz", repos = NULL, type = "source")
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

if(!require("openxlsx")){
  install.packages("openxlsx")
  library(openxlsx)
}

if(!require("meta")){
  install.packages("meta")
  library(meta)
}




