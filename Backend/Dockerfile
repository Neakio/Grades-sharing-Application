# base image  
FROM python:3.8   
# setup environment variable  
ENV DockerHOME=/home/app/webapp  

# set work directory  
RUN mkdir -p $DockerHOME  

# where your code lives  
WORKDIR $DockerHOME  

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

# install dependencies  
RUN pip install --upgrade pip  

# Install the required packages
RUN apk update
RUN apk add git

# copy whole project to your docker home directory. 
RUN git clone https://github.com/Neakio/Grades-Sharing-Application.git $DockerHOME
# run this command to install all dependencies  
RUN pip install -r /Backend/requirements.txt  
# port where the Django app runs  
EXPOSE 8000  
RUN python Backend/Airnote/manage.py makemigrations \
               && python Backend/Airnote/manage.py migrate
# start server  
CMD python manage.py runserver  