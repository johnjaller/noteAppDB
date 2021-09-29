# Note App

| Functionality          | Description                          
| -----------------------|---------------------------------------
|Adding new note         | adding note by note submission form
|Delete note             | Deleting note by pressing rubbish bin icon
|Edit note               | Edit note by adding text to note field

## Instruction:
1. clone this project
2. ```cd <repository>``` and ```npm install``` to install necessary component
3. Build your database with postgreSQL installed
4. type```psql``` in your terminal ```CREATE DATABASE <your-database-name>;```
3. Add a .env file to add your database name, username and password
4. Open another terminal to perform ```knex migrate:latest``` and ```knex seed:run``` to set up the database
3. perform ```nodemon``` or ```node app.js``` to start the app
4. navigate to ```localhost:8080``` on your browser
5. Feel free to give it a try
## Issues and Resolutions :
