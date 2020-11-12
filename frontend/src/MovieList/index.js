import MovieListCard from '../MovieListCard';
import './MovieList.css';

function MovieList({ movies }) {
  return (
    <ul className="MovieList">
      {movies.length > 0 ? movies.map(m => {
        return <MovieListCard key={m.id} id={m.id} title={m.title} />
      }) : <li>Start by searching for a movie!</li>}
    </ul>
  );
}

export default MovieList;