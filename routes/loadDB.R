mydb <- dbConnect(RSQLite::SQLite(), "../globals.sqlite")

# Create db from globals.xlsx
# available <- read_excel("globals.xlsx",
#                                sheet = "Input") %>%
#   mutate(
#     across(everything(), ~replace_na(.x, 0))
#   )
# mandatory <- read_excel("globals.xlsx",
#                                sheet = "Mandatory") %>%
#   mutate(
#     across(everything(), ~replace_na(.x, 0))
#   ) %>% rowid_to_column(var="ID")
# output_df <- read_excel("globals.xlsx",
#                                 sheet = "Output")%>%
#   mutate(
#     across(everything(), ~replace_na(.x, 0))
#   )
# 
# df_names <- read_excel("globals.xlsx",
#                              sheet = "Names") %>% rowid_to_column(var="ID")
# 
# dbWriteTable(mydb, "available", available)
# dbWriteTable(mydb, "mandatory", mandatory)
# dbWriteTable(mydb, "output_df", output_df)
# dbWriteTable(mydb, "df_names", df_names)

available<- dbReadTable(mydb, "available")
mandatory <- dbReadTable(mydb, "mandatory")
output_df <- dbReadTable(mydb, "output_df")
df_names <- dbReadTable(mydb, "df_names")