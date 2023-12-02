# Use the official rstudio/plumber image
FROM rstudio/plumber:latest

# Set the working directory
WORKDIR /app

# Copy the Plumber API script into the container
COPY . /app

# Expose the port that Plumber will run on
EXPOSE 8000

# Command to run the Plumber API
CMD ["plumber", "api.R"]
