import React, { Component } from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavorites } from '../actions';
import { StoreContext, connect } from '../index';

class AppWrapper extends Component {
  render () {
    return (
      <StoreContext.Consumer>
      {(store) => {
        return <App store={store} />
      }}
    </StoreContext.Consumer>
    )
  }
}

class App extends Component {
  componentDidMount() {
    const {store} = this.props;
    // make an api call
    // dispatch an action
    store.dispatch(addMovies(data));
    console.log('state:', store.getState());
  }
  isMovieFavorite = (movie)  => {
    const { movies } = this.props.getState();

    const index = movies.favorites.indexOf(movie);
    if(index !== -1){
      return true;
    }
    return false;
  }
  onChangeTab = (val) => {
    this.props.dispatch(setShowFavorites(val));
  }
  render() {
    return (
    <StoreContext.Consumer>
      {(store) => {
        const { movies, search } = store.getState();
        const { list, favorites, showFavorites } = movies; //{movies: [], search: []}
        console.log('RENDER', store.getState());
        const displayMovies = showFavorites ? favorites : list;
          return (
            <div className="App">
              <Navbar dispatch={store.dispatch} search={search}/>
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
                      dispatch={store.dispatch}
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
    </StoreContext.Consumer>
    );
}}

const ConnectedToStoreApp = connect(function (state) {
  return{
    movies: state.movies,
    search: state.search
  }
})(App);

export default ConnectedToStoreApp;