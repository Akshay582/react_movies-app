import { combineReducers } from 'redux';
import { 
    ADD_MOVIES, 
    ADD_FAVORITES, 
    REMOVE_FROM_FAVORITES, 
    SET_SHOW_FAVORITES, 
    ADD_MOVIE_TO_LIST,
    ADD_SEARCH_RESULT
} from '../actions';

const initialMoviesState = {
    list: [],
    favorites: [],
    showFavorites: false
};

/* creating a pure function for a
    predictable state*/
export function movies (state = initialMoviesState, action) {

    switch(action.type) {
        case ADD_MOVIES:
            return{
                ...state,
                list: action.movies
            }
        case ADD_FAVORITES:
            return{
                ...state,
                favorites: [action.movie, ...state.favorites]
            }
        case REMOVE_FROM_FAVORITES:
            const filteredArray = state.favorites.filter(
                movie => movie.Title !== action.movie.Title
            );
            return{
                ...state,
                favorites: filteredArray
            };
        case SET_SHOW_FAVORITES: 
            return{
                ...state,
                showFavorites: action.val
            }
        case ADD_MOVIE_TO_LIST: 
            return{
                ...state,
                list: [action.movie, ...state.list]
            }
        default:
            return state;
    }
}

const initialSearchState = {
    result: {},
    showSearchResults: false
};

export function search(state = initialSearchState, action){
    switch(action.type) {
        case ADD_SEARCH_RESULT:
            return{
                ...state,
                result: action.movie,
                showSearchResults: true
            }
        case ADD_MOVIE_TO_LIST: 
            return{
                ...state,
                showSearchResults: false
            }
        default:
            return state;
    }
}

// const initialRootState = {
//     movies: initialMoviesState,
//     search: initialSearchState
// }

/* ------The internal working of 
-----------the combine reducers */

// export default function rootReducer(state = initialRootState, action) {
//     return {
//         movies: movies(state.movies, action),
//         search: movies(state.search, action)
//     }
// }

export default combineReducers({
    movies,
    search
})