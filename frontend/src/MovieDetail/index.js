import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingTable from '../RatingTable';
import './MovieDetail.css';

const BASE_URL = "http://localhost:5000";

/**
 * MovieDetail renders a movie's details, form for rating a movie, 
 * and the RatingTable component.
 * 
 * Handles contact to backend API:
 *    - fetchDetails() pings the GET `/movies/:id` endpoint.
 *    - handleRating() pings the POST `/movies/:id/rate` endpoint.
 */
function MovieDetail() {
  const [data, setData] = useState();
  const { id } = useParams();

  // fetches the movie detail data upon mounting.
  useEffect(function handleFetchDetails() {
    async function fetchDetails() {
      let res = await fetch(`${BASE_URL}/movies/${id}`);
      let resData = await res.json();
      let details = resData.details;
      let director = resData.director;
      setData({ ...details, director: director, thumbs_up: resData.thumbs_up, thumbs_down: resData.thumbs_down });
    }
    fetchDetails();
  }, [id]);

  // pings backend api to register a rating submission for the movie.
  const handleRating = async (evt) => {
    evt.preventDefault();
    const { value } = evt.target;
    let res = await fetch(`${BASE_URL}/movies/${id}/rate`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "rating": value, "title": data.title })
    });
    let ratings = await res.json();
    setData(currVal => ({
      ...currVal,
      ...ratings
    }))
  }

  return (
    <div className="MovieDetail">
      {data &&
        <>
          <header className="MovieDetail-title">
            <h1>{data.title}</h1>
            <span>(Alt: {data.original_title})</span>
          </header>
          <section className="MovieDetail-details">
            <img src={data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/No_image_available_450_x_600.svg/450px-No_image_available_450_x_600.svg.png'} alt={data.title} />
            <div className="MovieDetails-description-container">
              <h4>Director: </h4>
              <p>{data.director}</p>
              <h4>Released date: </h4>
              <p>{data.release_date ? data.release_date : "Unknown"}</p>
              <h4>Overview</h4>
              <p>{data.overview ? data.overview : "No description found."}</p>
            </div>
          </section>
          <p className="MovieDetail-rating-title">What did you think about this movie?</p>
          <RatingTable thumbs_up={data.thumbs_up} thumbs_down={data.thumbs_down} />
          <form>
            <button className="MovieDetail-up" value="1" onClick={handleRating}>Love it!</button>
            <button className="MovieDetail-down" value="0" onClick={handleRating}>Nah!</button>
          </form>
        </>
      }
    </div>
  );
}

export default MovieDetail;