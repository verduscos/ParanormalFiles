# Paranormal Files 
![splash page](https://i.imgur.com/2dERcHN.png)

[Live](https://something-medium.herokuapp.com/) | [Project Wiki](https://github.com/verduscos/medium-clone/wiki)

[Paranormal Files](https://something-medium.herokuapp.com/), a [Medium](https://medium.com/) clone,  is a platform where users can find paranormal reports and where users  can share their experiences by writing on any paranormal topic.

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


# Sightings/Stories
Users can report a sighting and share an through the implementation of Amazon Web Services S3.
![sightings](https://medium-clone-photo-bucket.s3.us-west-1.amazonaws.com/create-pf.PNG)

View of a sighting after creation
![sightingview](https://medium-clone-photo-bucket.s3.us-west-1.amazonaws.com/sighting-pf.PNG)

# Commenting
Users can comment on a sighting to share their thoughts/
![comment](https://medium-clone-photo-bucket.s3.us-west-1.amazonaws.com/commens-pf.PNG)

Sign in easily as a Demo user
![signin modal](https://medium-clone-photo-bucket.s3.us-west-1.amazonaws.com/signin-pf.PNG)

## Features
Full CRUD:
 * [Sightings](https://github.com/verduscos/medium-clone/wiki/Feature-List) 
 * [Comments](https://github.com/verduscos/medium-clone/wiki/Feature-List)

Additional functionality:
 * [Categories](https://github.com/verduscos/medium-clone/wiki/Feature-List)

Upcoming featues:
 * Likes
 * Favorites
 * Search
 * Tags (will replace categories with tags which the user/reporter create instead of picking a category)

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
   DATABASE_URL=postgresql://magicbook_app:<<PASSWORD>>@localhost/magicbook_db
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
 

