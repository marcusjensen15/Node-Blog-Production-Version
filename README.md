# Notes on the application

Personal blogging site for Marcus Jensen. The admin user can: login, edit posts, and delete posts. Any non-logged in user can see the posts, but don't have full CRUD functionality.

Eventually, I will hide the 'New User' tab on the Navbar, as I don't want random people creating accounts, loggin in, and writing entries to my blog. As of now, this blog contains no real posts, and is a test deployment used for learning services.

# See the live deployed application here:




## Download and Installation

To download and use the blog locally, follow the instructions below:
* Clone this repo
* In the home directory of your computer, make sure mongoDB is installed correctly. Enter: 'brew tap mongodb/brew', 'brew install mongodb-community' in your terminal.
* After the install, run mongoDB locally on your computer by entering the following command in your terminal: mongod --config /usr/local/etc/mongod.conf
* recommendation: if you have MongoDB Compass installed on your machine, you will have a nice GUI interface to see what is happening in your MongoDB Database.
* WITH MONGODB RUNNING, you can navigate to your application directory. Run: 'npm i' in your terminal to install all necessary packages for this application.
* Once all necessary NPM packages are installed, you may run this application locally by entering: 'npm run start' within the application directory.
* With BOTH MongoDB Database and Application running locally, you can navigate to 'localhost:4000' to see the live application.
* All blog posts, new users, etc will be stored inside of your local MongoDB database.

* Database is hosted on mongodb.com (not HEROKU).
* Application front-end is hosted on Heroku


## Bugs and Issues

If you find any issues with this project, notify me directly.



## Copyright and License

Copyright 2020, Marcus Jensen [MIT License]
