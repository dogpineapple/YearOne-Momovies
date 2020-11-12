import './MovieListCard.css';

function MovieListCard({ id, title }) {
  return (
    <li className="MovieListCard">
      <a href={`/movies/${id}`}>{title}</a>
    </li>
  );
}

export default MovieListCard;