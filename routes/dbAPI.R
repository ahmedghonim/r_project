library(plumber)
library(tidyverse)
library(uxstats)
library(jsonlite)
library(DBI)
library(readxl)
library(openxlsx)
library(meta)
library(utilities)


getAvailableVariables<-function(){
  mydb <- dbConnect(RSQLite::SQLite(), "./routes/API.sqlite")
  vars<-dbGetQuery(mydb, "SELECT internal from VariableDef")
  df<-vars
  return (df)
}
addPossibleFn<-function(fn,groups, categories, prepost, vars){
  #Fn name, groups c(), categories c(), prepost 0/1 variable names from availableVariables
  mydb <- dbConnect(RSQLite::SQLite(), "./routes/API.sqlite")
  for(c in categories) {
    for (g in groups){
      
      condition<-paste0("C",c,
                        "_G",ifelse(g>2,3,g),
                        "_P",prepost)
      FnNameVars<-vars
      
      colsn<-paste0(paste(FnNameVars, collapse = ","),
                    ", condition")
      n<-length(FnNameVars)
      Vals<-rep("?",n+2)
      pars<-c(as.list(rep(1,n)),list(condition, fn))
      
      rs <- dbSendStatement(
        mydb,
        paste("INSERT INTO possibleVars (",paste(FnNameVars, collapse = ",")
              ,", condition, Function) VALUES (",paste(Vals,collapse = ","),")"),
        params = unname(pars)
      )
      dbClearResult(rs)
    }
  }
  dbDisconnect(mydb)
}



addMandatoryFn<-function(fn,groups, categories, prepost, vars){
  #Fn name, groups c(), categories c(), prepost 0/1 variable names from availableVariables
  mydb <- dbConnect(RSQLite::SQLite(), "./routes/API.sqlite")
  for(c in categories) {
    for (g in groups){
      
      condition<-paste0("C",c,
                        "_G",ifelse(g>2,3,g),
                        "_P",prepost)
      FnNameVars<-vars
      
      colsn<-paste0(paste(FnNameVars, collapse = ","),
                    ", condition")
      n<-length(FnNameVars)
      Vals<-rep("?",n+3)
      pars<-c(as.list(rep(1,n)),list(condition, fn, c))
      
      rs <- dbSendStatement(
        mydb,
        paste("INSERT INTO mandatoryVars (",paste(FnNameVars, collapse = ",")
              ,", condition, Function, category) VALUES (",paste(Vals,collapse = ","),")"),
        params = unname(pars)
      )
      dbClearResult(rs)
    }
  }
  dbDisconnect(mydb)
}

addOutputFn<-function(fn, vars){
  #Fn name, groups c(), categories c(), prepost 0/1 variable names from availableVariables
  mydb <- dbConnect(RSQLite::SQLite(), "./routes/API.sqlite")

      
    
      FnNameVars<-vars
      
      colsn<-paste0(paste(FnNameVars, collapse = ","),")")
      n<-length(FnNameVars)
      Vals<-rep("?",n+1)
      pars<-c(as.list(rep(1,n)),list(fn))
      
      rs <- dbSendStatement(
        mydb,
        paste("INSERT INTO outputVars (",paste(FnNameVars, collapse = ",")
              ,", Function) VALUES (",paste(Vals,collapse = ","),")"),
        params = unname(pars)
      )
      dbClearResult(rs)
    
  
  dbDisconnect(mydb)
}

