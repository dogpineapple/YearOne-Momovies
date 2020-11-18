import { useState } from 'react';
import Alert from '../Alert';
import MovieList from '../MovieList';
import SearchForm from '../SearchForm';
import './MovieListPage.css';

const BASE_URL = "http://localhost:5000";

function MovieListPage({ movies }) {
  const [data, setData] = useState({ movies: [], totalPages: 0, totalResults: 0, searchedTerm: "" });
  const [alerts, setAlerts] = useState([]);

  const searchApi = async (term, page = 1) => {
    setAlerts("");
    try {
      let res = await fetch(`${BASE_URL}/movies/search?term=${term}&page=${page}`);
      let movieResults = await res.json();
      if (movieResults.errors) {
        setAlerts(movieResults.errors);
      } else {
        setData({ movies: movieResults.results, totalPages: movieResults.total_pages, totalResults: movieResults.total_results, searchedTerm: term });
        if (movieResults.results.length === 0) {
          setAlerts(["No movies found! :("])
        }
      }
    } catch (err) {
      setAlerts(["Server Offline: Refused to connect."]);
    }
  }

  const handlePageChange = async (evt) => {
    const { value } = evt.target;
    await searchApi(data.searchedTerm, value);
  }

  const pageNumbers = [];
  for (let i = 1; i <= data.totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="MovieListPage">
      <header className="MovieListPage-header">
        <p className="MovieListPage-about">The Movie Search Engine</p>
        <h1><span>Momo</span>vies</h1>
        <p className="MovieListPage-credits">powered by TMDB</p>
      </header>
      <SearchForm searchApi={searchApi} />
      <section className="MovieListPage-pages-container">
        <form className="MovieListPage-page-form">
          <label>Page: </label>
          <select onChange={handlePageChange}>
            {pageNumbers.map(num => {
              return <option key={num} value={num}>{num}</option>
            })}
          </select>
        </form>
        {alerts.length !== 0 && alerts.map(alert => <Alert key={alert} alert={alert} />)}
        {data.totalResults !== 0 && <p className="MovieListPage-ttl-results">{data.totalResults} movies found!</p>}
      </section>
      <MovieList movies={data.movies} />
    </div>
  );
}

export default MovieListPage;