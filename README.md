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

## Actions


Need | Tasks | Dev | Unit Test | Int Test | Val
-----|-------|-----|-----------|----------|-----
Database | 
Public Page | SSO login </br> Goal of the app |
Adm Page | Landing Page </br> Users/Role Pages </br> Classes Pages </br> Courses Pages | 
Teacher Page | Landing Page </br> Classes Pages </br> Grades Pages | 
Student Page | Landing Page </br> Grade Page |
Web API |  


## Optionnal implementation

Be able to put an attachment (with a maximum size) link to a note  
Export notes to PDF  
Calendar of exam and retake  
Info tab from administration and class deleguate  
See in red the note under 10  

Have an update on the user databse from the AD  
