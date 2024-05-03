mydb <- dbConnect(RSQLite::SQLite(), "./globals.sqlite")


available<- dbReadTable(mydb, "available")
mandatory <- dbReadTable(mydb, "mandatory")
output_df <- dbReadTable(mydb, "output_df")
df_names <- dbReadTable(mydb, "df_names")
Labs <- dbReadTable(mydb, "labs")
categories <- dbReadTable(mydb, "categories")
presets <- dbReadTable(mydb, "presets")


