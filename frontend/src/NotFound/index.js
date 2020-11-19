import './NotFound.css';

/**
 * NotFound renders information for a 404 page.
 */
function NotFound() {
  return (
    <div className="NotFound">
      <h1>
      The page you are trying to access hasn't been made yet.
      </h1>
      <p className="NotFound-contact">
      Let me know on github <a href="https://github.com/dogpineapple" target="_blank" rel="noreferrer">@dogpineapple</a>!
      </p>
    </div>
  );
}

export default NotFound;