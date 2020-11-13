import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import MovieDetail from './MovieDetail';
import NotFound from './NotFound';
import MovieListPage from './MovieListPage';
import NavBar from './NavBar';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/movies/:id">
            <MovieDetail />
          </Route>
          <Route exact path="/">
            <MovieListPage />
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