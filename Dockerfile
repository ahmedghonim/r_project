# Use the official rstudio/plumber image
FROM rstudio/plumber:latest

# Set the working directory
WORKDIR /app

RUN Rscript -e "install.packages(c('logger', 'tictoc', 'fs'), repos = 'https://cran.rstudio.com/')"

# Copy the Plumber API script into the container
COPY . /app

# Expose the port that Plumber will run on
EXPOSE 8000

# Command to run the Plumber API
CMD ["plumber", "api.R"]
