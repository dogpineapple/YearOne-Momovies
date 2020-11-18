from flask import Flask, request
import requests
from models import db, connect_db, Movie
from flask_cors import CORS
from dotenv import load_dotenv

#load the environment variables.
load_dotenv()

import os

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "postgresql:///momovies"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = False

connect_db(app)

API_BASE_URL = os.getenv("API_BASE_URL")
API_KEY = os.getenv("API_KEY")


@app.route("/movies/search", methods=["GET"])
def search_movie():
    """Search for movie(s). /movie/search?term=[term]"""

    term = request.args["term"]
    page = request.args.get("page", 1)
    # hit the movie api.
    querystring = {"api_key": API_KEY, "query": term, "page": page}

    res = requests.request("GET", f"{API_BASE_URL}/search/movie", params=querystring)
    data = res.json()

    return (data, 200)


@app.route("/movies/<movie_id>", methods=["GET"])
def get_movie_details(movie_id):
    """Retrieve movie details and rating details (if available)."""

    # default response object
    resp = {
        "details": "",
        "director": "No director found.",
        "thumbs_up": 0,
        "thumbs_down": 0,
    }

    # check local database if the movie exist for rating details
    movie = Movie.query.filter_by(movie_id=movie_id).first()

    # if the movie is obtained, set the thumbs_up, thumbs_down
    if movie:
        resp["thumbs_up"] = movie.thumbs_up
        resp["thumbs_down"] = movie.thumbs_down

    querystring = {"api_key": API_KEY}
    creditsRes = requests.request(
        "GET", f"{API_BASE_URL}/movie/{movie_id}/credits", params=querystring
    )
    detailsRes = requests.request(
        "GET", f"{API_BASE_URL}/movie/{movie_id}", params=querystring
    )

    # add movie details to our response object.
    resp["details"] = detailsRes.json()

    # get the crew array from movie api credit results.
    crew = creditsRes.json().get("crew")

    # if there are crew members, filter for the director.
    if crew:

        def filterCallback(person):
            if person.get("job") == "Director":
                return True
            else:
                return False

        director = list(filter(filterCallback, crew))

        if director:
            resp["director"] = director[0].get("name")

    return (resp, 200)


@app.route("/movies/<movie_id>/rate", methods=["POST"])
def rate_movie(movie_id):
    """Rate a movie given movie_id, rating is either 1 (up) or 0 (down)"""

    try:
        rating = request.json.get("rating")
        title = request.json.get("title")
        
        if not title or not rating:
            raise Exception("Missing rating or/and title.")

        # filter to see if the movie already exists in db
        movie = Movie.query.filter_by(movie_id=movie_id).first()

        if movie:
            movie.handleRating(rating)
        else:
            movie = Movie(title=title, movie_id=movie_id)
            movie.handleRating(rating)
            db.session.add(movie)

        db.session.commit()

        return ({"thumbs_up": movie.thumbs_up, "thumbs_down": movie.thumbs_down}, 201)
    except Exception as e:
        return ({"error": [str(e)]}, 422)
    except:
        return ({"error": ["An error occurred during the process. Try again later."]}, 500)