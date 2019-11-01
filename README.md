# Django React Postgres Docker Heroku App
This repo serves as a starting point for developing a production-ready application using Django, Postgres, and React in a Dockerized environment with deployment to Heroku. Logic was added in a view (backend/service/views.py) and the frontend (frontend/src/App.js) to show the communication between the frontend (React) and backend (Django), otherwise very little business logic has been added to this project. For additional details on how this project was set up, see the [Third-Party Guides](#Third-Party-Guides) that were used as a foundation for this project below.  

# Local Deployment  
  1) Install docker: https://docs.docker.com/v17.12/install/  
  2) Clone github repo  
  3) Run: `docker-compose up --build`  

# Production Deployment  
   1) [Create Heroku Account](https://signup.heroku.com/dc)  
   2) [Download/Install/Setup Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)  
    - After install, log into Heroku CLI: `heroku login`  
   3) Run: `heroku create <your app name>` to create the Heroku application  
    - The app name must be unique among all Heroku apps, and it can be omitted from command and you can [rename your app later](https://devcenter.heroku.com/articles/renaming-apps)  
   4) Set your envionment variables for your production environment by running:  
    ```heroku config:set PRODUCTION_HOST=<your app name>.herokuapp.com SECRET_KEY=<your secret key> DJANGO_SETTINGS_MODULE=backend.settings.prod```  
    - Additional info on the SECRET_KEY can be found [here](https://docs.djangoproject.com/en/2.2/ref/settings/#std:setting-SECRET_KEY)  
   5) Run: `heroku stack:set container` so Heroku knows this is a containerized application  
   6) Run: `heroku addons:create heroku-postgresql:hobby-dev` which creates the postgres add-on for Heroku 
   7) Deploy your app by running: `git push heroku master`  
   8) Go to `<your app name>.herokuapp.com` to see the published website.  

# Additional Resources  
## Official Documentation  
[React Getting Started](https://reactjs.org/docs/getting-started.html)  
[Django Getting Started](https://docs.djangoproject.com/en/2.2/intro/)  
[Heroku Deployment for Dockerized Application](https://devcenter.heroku.com/articles/build-docker-images-heroku-yml)  

## Third-Party Guides  
- Initial Setup: https://dev.to/englishcraig/creating-an-app-with-docker-compose-django-and-create-react-app-31lf  
- Connecting Django and Postgres in Heroku Deployment: https://testdriven.io/blog/deploying-django-to-heroku-with-docker/  

### Additional Code Changes  
  Django:  
  - models moved to folder, migrations moved within models folder  
  - in backend/urls.py, there is a regex that sends all urls that are undefined to the index.html template  
    - this causes a problem when accessing sites without appending a backslash  
      - `<your app name>.herokuapp.com/admin/` will display the Django admin page  
      - `<your app name>.herokuapp.com/admin` will not display the Django admin page  
  - a scripts/ folder was added (backend/scripts) which contains the `entrypoint.sh` file which defines the startup process for the Django container which is called by the Dockerfile  

  Docker:  
  - the Dockerfile.prod file was updated to install NodeJS and Yarn which failed in the Initial Setup third-party guide above  
  - the development Dockerfile for Django is built from an alpine version (the Prod Dockerfile has not yet been updated due to some problems installing NodeJS and Yarn from an alpine environment)  
