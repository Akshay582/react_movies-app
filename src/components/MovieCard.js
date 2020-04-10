import React, { Component } from 'react';
import { addFavorites, removeFromFavorites } from '../actions';

export default class MovieCard extends Component {
    handleFavoriteClick = () => {
        const {movie} = this.props;   
        this.props.dispatch(addFavorites(movie)); 
    }
    handleUnfavoriteClick = () => {
        const { movie } = this.props;   
        this.props.dispatch(removeFromFavorites(movie)); 
    }
    render() {
        const {Poster, Title, Plot, imdbRating} = this.props.movie;
        const {isFavorite} = this.props;
        console.log(isFavorite);
        return (
            <div className="movie-card">
                <div className="left">
                    <img alt="movie-poster" src={Poster}></img>
                </div>
                <div className="right">
                    <div className="title">{Title}</div>
                    <div className="plot">{Plot}</div>
                    <div className="footer">
                        <div className="rating">{imdbRating}</div>
                        {
                            !isFavorite
                            ?<button className="favourite-btn"
                            onClick={this.handleFavoriteClick}>Favorite</button>
                            :<button className="unfavourite-btn"
                            onClick={this.handleUnfavoriteClick}>Unfavorite</button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
