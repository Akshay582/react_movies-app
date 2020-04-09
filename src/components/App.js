import React, { Component } from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';

class App extends Component {
  componentDidMount() {
    const {store} = this.props;
    store.subscribe(() => {
      console.log('Updated!');
      this.forceUpdate();
    })
    // make an api call
    // dispatch an action
    store.dispatch({
      type: 'ADD_MOVIES',
      movies: data
    });
    console.log('state:', store.getState());
  }
  render() {
    const movies = this.props.store.getState();
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favorite</div>
        </div>
        <div className="list">
          {movies.map((movie, index) => (
            <MovieCard movie={movie} key={`movies-${index}`}/>
          ))}
        </div>
        </div>
        </div>
    )
  }
}

export default App;