import MovieListCard from '../MovieListCard';
import './MovieList.css';

/**
 * Given an Array 'movies', render <li> for each movie. 
 * 
 * @param {Object[]} movies
 * @param {Object} movies[]
 */
function MovieList({ movies }) {
  return (
    <ul className="MovieList">
      {movies.length > 0 && movies.map(m => {
        return <MovieListCard key={m.id} id={m.id} title={m.title} posterPath={m.poster_path}/>
      })}
    </ul>
  );
}

export default MovieList;