from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Movie(db.Model):

    __tablename__ = "movies"

    movie_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False, default="No title")
    thumbs_up = db.Column(db.Integer, default=0)
    thumbs_down = db.Column(db.Integer, default=0)

    def handleRating(self, rating):
        """Handle the thumbs_up/thumbs_down count for a movie."""
        if rating:
            currVal = self.thumbs_up or 0
            self.thumbs_up = currVal + 1
        else:
            currVal = self.thumbs_down or 0
            self.thumbs_down = currVal - 1


def connect_db(app):
    """Connect this database to provided Flask app."""

    db.app = app
    db.init_app(app)