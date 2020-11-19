# Momovies
Momovies is a simple movie web application that uses TheMovieDB API. 
Features movie search, show movie details, and movie ratings.

Backend created with Python/Flask/SQLALCHEMY
Frontend created with JavaScript/React.js

No CSS templates were used.

Frontend: https://github.com/dogpineapple/YearOne-Momovies/tree/main/frontend
Backend: https://github.com/dogpineapple/YearOne-Momovies/tree/main/backend

# Frontend Set Up
1. In the `frontend` folder, install the dependencies with the command `npm install package-lock.json`
2. To start up the server locally, use the command `npm start`. This will host on localhost:3000
3. `npm start` should automatically open localhost:3000 on your browser. Make sure that the backend server is running before use!

# Backend Set Up
1. In the `backend` folder, create your virtual environment by using the command `python3 -m venv venv`. This will create a venv folder.
2. Activate the venv folder by using the command `source venv/bin/activate`. This will activate your venv.
3. Now you are ready to install the dependencies by using the command `pip install -r requirements.txt`.
4. !IMPORTANT! Create the PostgreSQL database for the application! In the PostgreSQL, use `CREATE DATABASE momovies`.
5. Create a `.env` file in the `api` folder and set `API_KEY` and `API_BASE_URL`  environmental variables. This application uses The Movie DB
The Movie DB: https://developers.themoviedb.org/3/getting-started/introduction
API_BASE_URL = https://api.themoviedb.org/3
API_KEY = [Please retrieve a free API key from The Movie DB!]
*NOTE*: Make sure your `.env` file is created in the `api` folder. Otherwise, `flask run` will not be able to find `app.py`!
6. In the `api` folder, start up the Flask server and using the command `flask run`. This server will run on localhost:5000.


# Future Considerations/To-dos (OVERALL)
Write backend tests for rating movies with mocks.
Add frontend tests with React Testing Library
Use SASS to DRY up CSS
Implement Redux or Context (minor prop drilling exists in some components)

# Challenges
- Normalizing the movie card list item sizing.
- Constructing the GET `/movies/<movie_id>` endpoint; obtaining the Director information, as the GET Movie Details endpoint from TMDB did not include the "director" key.
- Organizing the frontend components to minimalize setState/state prop passing.
- First time using `fetch` to ping backend API instead of using the `axios` library. 