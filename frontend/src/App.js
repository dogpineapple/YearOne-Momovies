import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import MovieDetail from './MovieDetail';
import NotFound from './NotFound';
import MovieListPage from './MovieListPage';
import NavBar from './NavBar';
import Contact from './Contact';

/**
 * App component hosts the routing for the app.
 */
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/movies/:id">
            <MovieDetail />
          </Route>
          <Route exact path="/search">
            <MovieListPage />
          </Route>
          <Route exact path="/">
            <MovieListPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Contact />
      </BrowserRouter>
    </div>
  );
}

export default App;