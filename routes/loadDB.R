# mydb <- dbConnect(RSQLite::SQLite(), "./globals.sqlite")
# 
# 
# available<- dbReadTable(mydb, "available")
# mandatory <- dbReadTable(mydb, "mandatory")
# output_df <- dbReadTable(mydb, "output_df")
# df_names <- dbReadTable(mydb, "df_names")
# Labs <- dbReadTable(mydb, "labs")
# categories <- dbReadTable(mydb, "categories")
# presets <- dbReadTable(mydb, "presets")


mydb <- dbConnect(RSQLite::SQLite(), "./API.sqlite")


available<- dbReadTable(mydb, "possibleVars")
mandatory <- dbReadTable(mydb, "mandatoryVars")
output_df <- dbReadTable(mydb, "outputVars")
df_names <- dbReadTable(mydb, "VariableDef")
Labs <- dbReadTable(mydb, "Labs")
categories <- dbReadTable(mydb, "Categories")


