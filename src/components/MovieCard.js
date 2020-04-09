import React, { Component } from 'react'

export default class MovieCard extends Component {
    render() {
        const {Poster, title, Plot, imdbRating} = this.props.movie;
        return (
            <div className="movie-card">
                <div className="left">
                    <img alt="movie-poster" src={Poster}></img>
                </div>
                <div className="right">
                    <div className="title">{title}</div>
                    <div className="plot">{Plot}</div>
                    <div className="footer">
                        <div className="rating">{imdbRating}</div>
                        <button className="favourite-btn">Favorite</button>
                    </div>
                </div>
            </div>
        )
    }
}
