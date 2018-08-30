import {combineReducers} from 'redux-immutable';
import {fromJS} from 'immutable';
import {handleActions} from 'redux-actions';
import {paginate} from './paginate';
import {moviePaginationReducer} from './moviePaginationReducer';
import {videoPaginationReducer} from './videoPaginationReducer';
import {
    popularRequest,
    popularSuccess,
    searchRequest,
    searchSuccess,
    pushToFavourite,
    sliceFromFavourite,
    recommendationsRequest,
    recommendationsSuccess,
    movieVideosRequest,
    movieVideosSuccess,
    similarMoviesRequest,
    similarMoviesSuccess
} from '../lib/reduxActions/actions';

import {RECOMMENDATIONS, SIMILAR_MOVIES, VIDEOS} from '../constants/paginationConstants';

const entities = (state = fromJS({movies: {}, genres: {}}), action) => {
    if (action.payload && action.payload && action.payload.entities) {
        const newEntitiesInMap = fromJS(action.payload.entities);
        return state.mergeDeep(state, newEntitiesInMap);
    }
    return state;
};

const favourites = handleActions(
    {
        [pushToFavourite]: (state, {payload: {id, time}}) => {
            return state.set(id, time);
        },
        [sliceFromFavourite]: (state, {payload: {id}}) => {
            return state.delete(id);
        }
    },
    fromJS({})
);

const paginationReducer = combineReducers({
    popular: moviePaginationReducer({
        types: [popularRequest, popularSuccess]
    }),
    searched: paginate({
        mapActionToKey: ({payload: {name}}) => name,
        types: [searchRequest, searchSuccess]
    }),
    [RECOMMENDATIONS]: paginate({
        mapActionToKey: ({payload: {id}}) => id,
        types: [recommendationsRequest, recommendationsSuccess]
    }),
    [SIMILAR_MOVIES]: paginate({
        mapActionToKey: ({payload: {id}}) => id,
        types: [similarMoviesRequest, similarMoviesSuccess]
    }),
    [VIDEOS]: paginate({
        mapActionToKey: ({payload: {id}}) => id,
        types: [movieVideosRequest, movieVideosSuccess],
        currentPaginationReducer: videoPaginationReducer
    }),
    favourites: favourites
});

const rootReducer = combineReducers({
    entities,
    pagination: paginationReducer
});

export default rootReducer;
