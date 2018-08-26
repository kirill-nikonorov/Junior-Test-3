import {createActions} from 'redux-actions';

export const {movieVideosRequest, movieVideosSuccess} = createActions(
    'MOVIE_VIDEOS_REQUEST',
    'MOVIE_VIDEOS_SUCCESS'
);
