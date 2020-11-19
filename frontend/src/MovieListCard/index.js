import './MovieListCard.css';

/**
 * MovieListCard expects (a movie's) id, title, posterPath.
 * 
 * Renders a list item with a link to the movie's detail page, 
 * poster image, and movie title.
 */
function MovieListCard({ id, title, posterPath }) {
  return (
    <li className="MovieListCard">
      <a href={`/movies/${id}`}>
      <img src={posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/No_image_available_450_x_600.svg/450px-No_image_available_450_x_600.svg.png'} alt={title}/>
      <p className="MovieListCard-title">{title}</p></a>
    </li>
  );
}

export default MovieListCard;