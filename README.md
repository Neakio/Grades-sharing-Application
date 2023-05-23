# Grades-sharing-Application

## Needs

- A Public page explaining the goal of the app
- A Landing Page when authenticated explaining the app context. They want to integrate on this page a Motivational quote of the day changing every time to motivate their users !
- An administration only page allowing to assign users a role (student/teacher/administration). This page should also allow the admin user to create a course
- A teacher only page allowing to add a grade to a student for an existing course
- A student only page allowing them to consult their grades
- A web API needs to be created to allow them to automate their tasks.

Documentation for the API.

Pour la partie Web API projet, doit-on mettre en place un token pour pouvoir automatiser les tâches (depuis un script par exemple)? Ou juste une interface web pour upload des fichiers (par exemple CSV)?  
Mise en place d’un endpoint de type REST et des mesures nécessaires à sa sécurisation

https://coolors.co/b715af-333333-039bc9-5a0c58-f1efe4-09265d

## Actions

| Need         | Tasks                                                                       | Dev | Unit Test | Int Test | Val |
| ------------ | --------------------------------------------------------------------------- | --- | --------- | -------- | --- |
| Database     |
| Public Page  | SSO login </br> Goal of the app                                             |
| Adm Page     | Landing Page </br> Users/Role Pages </br> Classes Pages </br> Courses Pages |
| Teacher Page | Landing Page </br> Classes Pages </br> Grades Pages                         |
| Student Page | Landing Page </br> Grade Page                                               |
| Web API      |

## Need installed

FRONT  
nodejs  
yarn

sudo apt-get update
sudo apt-get install curl python3 pip python3-virtualenv -y

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get update
sudo apt install -y nodejs yarn

yarn run dev

BACK  
python3  
pip  
python3-virtualenv

virtualenv venv
source venv/bin/activate  
pip install -r requirements.txt

python3 manage.py makemigrations  
python3 manage.py migrate

python3 manage.py runserver

postman for test

## Optionnal implementation

Be able to put an attachment (with a maximum size) link to a note  
Export notes to PDF  
Calendar of exam and retake  
Info tab from administration and class delegate  
See in red the note under 10

Have an update on the user databse from the AD

## Links

https://blog.logrocket.com/react-table-complete-guide/#use-cases-react-table  
https://blog.openreplay.com/better-tables-with-react-table/  
https://testdriven.io/blog/drf-serializers/  