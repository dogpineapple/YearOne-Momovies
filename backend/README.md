# Momovies Backend
This is the backend folder for the web application 'Momovies'. If you would like to view the frontend, please visit:
Frontend: https://github.com/dogpineapple/YearOne-Momovies/tree/main/frontend

# Backend Set Up
1. In the `backend` folder, create your virtual environment by using the command `python3 -m venv venv`. This will create a venv folder.
2. Activate the venv folder by using the command `source venv/bin/activate`. This will activate your venv.
3. Now you are ready to install the dependencies by using the command `pip install requirements.txt`.
4. !IMPORTANT! Create the PostgreSQL database for the application! In the PostgreSQL, use `CREATE DATABASE momovies`.
5. Create a `.env` file in the `api` folder and set `API_KEY` and `API_BASE_URL`  environmental variables. This application uses The Movie DB
The Movie DB: https://developers.themoviedb.org/3/getting-started/introduction
API_BASE_URL = https://api.themoviedb.org/3
API_KEY = [Please retrieve a free API key from The Movie DB!]
*NOTE*: Make sure your `.env` file is created in the `api` folder. Otherwise, `flask run` will not be able to find `app.py`!
6. In the `api` folder, start up the Flask server and using the command `flask run`. This server will run on localhost:5000.

# Technologies Used
Flask ()
SQLALCHEMY (python-based ORM)

dotenv (environmental variables)
black (python code formatter)

# Future Considerations/To-dos
Write tests for rating movies with mocks.
