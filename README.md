# Paranormal Files 
![splash page](https://i.imgur.com/2dERcHN.png)

[Live](https://paranormalfiles.herokuapp.com/) | [Project Wiki](https://github.com/verduscos/medium-clone/wiki)

[Paranormal Files](https://paranormalfiles.herokuapp.com/), a [Medium](https://medium.com/) clone,  is a platform where users can find paranormal reports and where users  can share their experiences by writing on any paranormal topic.

# Application Architecture
Paranormal Files is built on a React frontend and a Flask backend with a PostgreSQL database. This application utilizes Amazon S3 to allow for image upload.

## Technologies Used
<div>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/>
   <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" height=40 />
   <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/>
   <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/>
   <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=40/>
   <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" height=40 />
</div>

## Features
 * Post, update, and delete sightings.
<img src="https://user-images.githubusercontent.com/89158442/207747715-3ba9718a-7166-402f-a1bc-a7ecf8fed472.png" />

 * Users should include Tags to help other members find their sighting.
<img src="https://user-images.githubusercontent.com/89158442/207747729-a95bdf38-dc73-4db2-8e54-6c0e98a7100d.png" />

 * Sighting Page:
<img src="https://user-images.githubusercontent.com/89158442/207747736-fc38e20a-9013-42ae-9b81-4cc9776cbb9b.png" />

 * Users are able to post, update, or delete their own comments.
<img src="https://user-images.githubusercontent.com/89158442/207751090-6cae53ee-02b7-4150-be5d-75e9d32975d9.png" />

 * Users can like or dislike a sighting and track sightings they may want revisit by bookmarking.
<img src="https://user-images.githubusercontent.com/89158442/207751588-4c059d43-e28a-4d54-8def-8e5600f9c328.png" />

 * Search all sightings.
<img src="https://user-images.githubusercontent.com/89158442/207752000-056e11a7-99b6-4253-85e0-cc60f87b76b4.png" />

 * Mobile view:
<img src="https://user-images.githubusercontent.com/89158442/207755722-260ada6c-2478-4977-a35c-8752f7bba8f0.png" height=667 width=375 />

Upcoming featues:
 * Follows and feed

## Getting started

1. Clone this repository (only this branch)

 ```bash
   git clone https://github.com/verduscos/medium-clone
 ```

2. Install dependencies

```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
```

3. Create a **.env** file based on the example with proper settings for your
   development environment
```
   FLASK_APP=app
   FLASK_ENV=development
   SECRET_KEY=<<YOUR-SECRET_KEY>>
   DATABASE_URL=postgresql://medium_app:password@localhost/medium_db
```

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Access your `pipenv shell`, migrate your database, seed your database, and run your flask app with the following commands:
```
pipenv shell
```
```
flask db upgrade
```
```
flask seed all
```
```
flask run
```

6. To run the React App, `cd` into the `react-app` directory, install `react-app`, and then start React:
 ```
    cd react-app
 ```
  ```
    npm install
 ```
  ```
    npm start
 ```
 

