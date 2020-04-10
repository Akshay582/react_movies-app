import React, { Component } from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavorites } from '../actions';

class App extends Component {
  componentDidMount() {
    const {store} = this.props;
    store.subscribe(() => {
      console.log('Updated!');
      this.forceUpdate();
    })
    // make an api call
    // dispatch an action
    store.dispatch(addMovies(data));
    console.log('state:', store.getState());
  }
  isMovieFavorite = (movie)  => {
    const { movies } = this.props.store.getState();

    const index = movies.favorites.indexOf(movie);
    if(index !== -1){
      return true;
    }
    return false;
  }
  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavorites(val));
  }
  render() {
    const { movies, search } = this.props.store.getState();
    const { list, favorites, showFavorites } = movies; //{movies: [], search: []}
    console.log('RENDER', this.props.store.getState());
    const displayMovies = showFavorites ? favorites : list;
    return (
      <div className="App">
        <Navbar dispatch={this.props.store.dispatch} search={search}/>
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavorites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavorites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favorite</div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard 
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.store.dispatch}
                isFavorite={this.isMovieFavorite(movie)}
              />
            ))}
          </div>
            {displayMovies.length === 0 ? <div className="no-movies"> No movies to display </div> : null}
          </div>
        </div>
    )
  }
}

export default App;