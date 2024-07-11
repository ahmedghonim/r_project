library(plumber)
library(tidyverse)
library(uxstats)
library(jsonlite)
library(DBI)
library(readxl)
library(openxlsx)
library(meta)
library(utilities)
mydb <- dbConnect(RSQLite::SQLite(), "./routes/API.sqlite")

for( i in 1:nrow(df_names)){
  
  condition<-ifelse(is.na(df_names$group_1[i]),"D",
                    paste0("C",df_names$category[i],
                          "_G",match(1,as.vector(df_names[i,2:4])),
                          "_P",df_names$prepost[i]))
  
  rs <- dbSendStatement(
    mydb,
    "INSERT INTO VariableDef (internal, ui, conditional,type) VALUES (?, ?, ?, ?)",
    params = list(df_names$internal[i], df_names$ui[i],condition ,df_names$type[i])
  )
  dbClearResult(rs)
}


dbDisconnect(mydb)

addVariable<-function(internal, ui, type,  groups, categories, prepost){
  #add variable with Name ui to groups C(), categories c(), and prepost 0/1
  mydb <- dbConnect(RSQLite::SQLite(), "./routes/API.sqlite")

 for(c in categories) {
  for (g in groups){
    
    condition<-""
    if(is.na(g) || is.na(c) || is.na(prepost)){
      condition<-"D"
    }
    else{
      condition<-paste0("C",c,
             "_G",ifelse(g>2,3,g),
             "_P",prepost)
    }
    
    rs <- dbSendStatement(
      mydb,
      "INSERT INTO VariableDef (internal, ui, conditional,type) VALUES (?, ?, ?, ?)",
      params = list(internal, ui,condition ,type)
    )
    dbClearResult(rs)
  }
   }
  dbDisconnect(mydb)
  
}


createMandatoryTable<-function(){
varNames<-c("Function","condition",
            unlist(as.vector(unique(getAvailableVariables()))))
n<-length(
  varNames
)
types<-c("TEXT","TEXT",rep("INT",n-2))
names(types)<-varNames
notnull<-c("NOT NULL", "NOT NULL",
           rep("DEFAULT (0) NOT NULL", n-2))

dbExecute(mydb, paste("CREATE TABLE possibleVars (",paste(paste(varNames, types, notnull), collapse=","), ")"))
dbDisconnect(mydb)

}

mydb <- dbConnect(RSQLite::SQLite(), "./routes/API.sqlite")

for( i in 1:nrow(mandatory)){
  FnNameVars<-mandatory[i,]%>%select(-ID, -starts_with("group"), -prepost, -category)%>%select_if(~ .!=0)
  condition<-ifelse(is.na(mandatory$group_1[i]),"D",
                    paste0("C",mandatory$category[i],
                           "_G",match(1,as.vector(mandatory[i,3:5])),
                           "_P",mandatory$prepost[i]))
  colsn<-paste0(paste(colnames(FnNameVars), collapse = ","),
  ", condition, category")
  n<-length(colnames(FnNameVars))+2
  Vals<-rep("?",n)
  pars<-c(as.list(FnNameVars),list(condition, mandatory$category[i]))
  
  rs <- dbExecute(
    mydb,
    paste("INSERT INTO mandatoryVars (",paste(colnames(FnNameVars), collapse = ",")
          ,", condition, category) VALUES (",paste(Vals,collapse = ","),")"),
    params = unname(pars)
  )
}
dbWriteTable(mydb,"Categories",categories)


