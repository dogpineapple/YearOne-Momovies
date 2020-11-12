import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import MovieList from './MovieList';
import SearchForm from './SearchForm';
import MovieDetail from './MovieDetail';
import Alert from './Alert';
import NotFound from './NotFound';

const BASE_URL = "http://localhost:5000";

function App() {
  const [movies, setMovies] = useState([]);
  const [alerts, setAlerts] = useState([]);

  
  const searchApi = async (term) => {
    setAlerts("");

    let res = await fetch(`${BASE_URL}/movies/search?term=${term}`);
    let movieResults = await res.json();
    
    if (movieResults.errors) {
      setAlerts(movieResults.errors);
    } else {
      setMovies(movieResults.results);
      if (movieResults.results.length === 0) {
        setAlerts(["No movies found! :( Try another search."])
      }
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/movies/:id">
            <MovieDetail />
          </Route>
          <Route exact path="/">
            <SearchForm searchApi={searchApi} />
            {alerts.length !== 0 && alerts.map(alert => <Alert key={alert} alert={alert} />)}
            <MovieList movies={movies} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
