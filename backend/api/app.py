from flask import Flask, request
import requests
from models import db, connect_db, Movie
import os

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "postgresql:///momovies"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = False

connect_db(app)

API_BASE_URL = "https://api.themoviedb.org/3"
api_key = "e0fda348e89ede47898e8a51f8d63772"


@app.route("/movies/search", methods=["GET"])
def search_movie():
    """Search for movie(s). /movie/search?term=[term]"""

    term = request.args["term"]
    # hit the movie api.
    querystring = {"api_key": api_key, "query": term}

    response = requests.request(
        "GET", f"{API_BASE_URL}/search/movie", params=querystring
    )

    return (response.json(), 200)


@app.route("/movies/<movie_id>/rate", methods=["POST"])
def rate_movie(movie_id):
    """Rate a movie given movie_id, rating is either 1 (up) or 0 (down)"""

    rating = request.json["rating"]
    title = request.json["title"]

    # filter to see if the movie already exists in db
    movie = Movie.query.filter_by(movie_id=movie_id).first()

    if movie:
    	movie.handleRating(rating)
    else:
        new_movie = Movie(title=title, movie_id=movie_id)
        new_movie.handleRating(rating)
        db.session.add(new_movie)

    db.session.commit()

    return ({"message": f"successfully updated ratings for {title}"}, 201)
