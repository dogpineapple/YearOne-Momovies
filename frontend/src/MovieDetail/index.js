import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingTable from '../RatingTable';
import './MovieDetail.css';

const BASE_URL = "http://localhost:5000";

function MovieDetail() {
  const [data, setData] = useState();
  const { id } = useParams();

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
          <h1>{data.title}</h1>
          <span>({data.original_title})</span>
          <p>Director: {data.director}</p>
          <p>Released date: {data.release_date ? data.release_date : "Unknown"}</p>
          <div>
            <h4>Description</h4>
            <p>{data.overview ? data.overview : "No description found."}</p>
          </div>
          <p>What do you think about this movie?</p>
          <RatingTable thumbs_up={data.thumbs_up} thumbs_down={data.thumbs_down}/>
          <form >
            <button value="1" onClick={handleRating}>Thumbs Up</button>
            <button value="0" onClick={handleRating}>Thumbs Down</button>
          </form>
        </>
      }
    </div>
  );
}

export default MovieDetail;