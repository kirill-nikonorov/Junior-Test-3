import {createActions} from 'redux-actions';

export const {similarMoviesRequest, similarMoviesSuccess} = createActions(
    'SIMILAR_MOVIES_REQUEST',
    'SIMILAR_MOVIES_SUCCESS'
);
