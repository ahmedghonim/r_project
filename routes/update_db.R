library(plumber)
library(tidyverse)
library(uxstats)
library(jsonlite)
library(DBI)
library(readxl)
library(openxlsx)
library(meta)
library(utilities)

  mydb <- dbConnect(RSQLite::SQLite(), "./routes/globals.sqlite")
  
  #Prepare Labs
  
  labs_raw <- read_excel("labs_raw.xlsx", sheet = "Sheet2")
  
  write.xlsx(rbind(
    labs_raw%>%transmute(Conversion= paste0(Analyte, " (",Traditional, "->", SI,")"), ratio=toSI),
    labs_raw%>%transmute(Conversion= paste0(Analyte," (",SI,"->", Traditional,")"), ratio=toTraditional)
  )%>%arrange(Conversion),file = "labs.xlsx", rowNames = FALSE, sheetName="Labs")
  
  #Create db from globals.xlsx
  available <- read_excel("globals.xlsx",
                          sheet = "Input") %>%
    mutate(
      across(everything(), ~replace_na(.x, 0))
    )
  mandatory <- read_excel("globals.xlsx",
                          sheet = "Mandatory") %>%
    mutate(
      across(everything(), ~replace_na(.x, 0))
    ) %>% rowid_to_column(var="ID")
  output_df <- read_excel("globals.xlsx",
                          sheet = "Output")%>%
    mutate(
      across(everything(), ~replace_na(.x, 0))
    )
  
  df_names <- read_excel("globals.xlsx",
                         sheet = "Names") %>% rowid_to_column(var="ID")
  
  labs<- read_excel("labs.xlsx",
                    sheet = "Labs") %>% rowid_to_column(var="ID")
  
  categories<- read_excel("globals.xlsx", sheet = "Categories")
  
  dbWriteTable(mydb, "available", available, overwrite=TRUE)
  dbWriteTable(mydb, "mandatory", mandatory, overwrite=TRUE)
  dbWriteTable(mydb, "output_df", output_df, overwrite=TRUE)
  dbWriteTable(mydb, "df_names", df_names, overwrite=TRUE)
  dbWriteTable(mydb, "labs", labs, overwrite=TRUE)
  dbWriteTable(mydb, "categories", categories, overwrite=TRUE)
  dbDisconnect(mydb)
