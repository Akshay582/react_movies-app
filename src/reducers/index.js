import { combineReducers } from 'redux';
import { 
    ADD_MOVIES, 
    ADD_FAVORITES, 
    REMOVE_FROM_FAVORITES, 
    SET_SHOW_FAVORITES 
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
        default:
            return state;
    }
}

const initialSearchState = {
    result: {}
};

export function search(state = initialSearchState, action){
    return state;
}

const initialRootState = {
    movies: initialMoviesState,
    search: initialSearchState
}

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