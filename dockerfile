# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
# --no-cache-dir ensures we don't store the pip download cache, keeping the image smaller
# --upgrade pip ensures we have the latest pip
RUN pip install --no-cache-dir --upgrade pip -r requirements.txt

# Copy the rest of the backend application code into the container at /app
COPY . .

# Make port 5000 available to the world outside this container (as defined in app.py)
# Hugging Face Spaces typically uses port 7860 by default, but Flask is set to 5000.
# We'll configure the Space later to map the correct port.
EXPOSE 5000

# Define environment variable (optional, for clarity)
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Run app.py when the container launches using Flask's built-in server
# For production, consider using Gunicorn: CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
CMD ["flask", "run"]