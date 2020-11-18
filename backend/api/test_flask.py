from app import app
from unittest import TestCase


class MomoviesViewTestCase(TestCase):
    """Tests for the Momovies API."""

    def test_movie_search(self):
        """Test movie search endpoint."""
        with app.test_client() as client:

            resp = client.get("/movies/search?term=avengers%20endgame&page=1")
            data = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('"id": 299534', data)

    def test_get_movie_details(self):
        """Test movie detail retrieval endpoint."""
        with app.test_client() as client:

            resp = client.get("/movies/372058")
            data = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('"director": "Makoto Shinkai"', data)

    def test_422_rate_movie(self):
        """Test movie rating endpoint return 422 if invalid rating."""
        with app.test_client() as client:

            resp = client.post(
                "/movies/372058/rate", json={"rating": "2", "title": "Your Name."}
            )
            data = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 422)
            self.assertIn("Invalid rating value. Must be 1 or 0.", data)
    
    def test_400_rate_movie(self):
        """Test movie rating endpoint return 422 if invalid rating and title."""
        with app.test_client() as client:

            resp = client.post(
                "/movies/372058/rate", json={"rating": "", "title": ""}
            )
            data = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 422)
            self.assertIn("Missing rating or/and title.", data)
