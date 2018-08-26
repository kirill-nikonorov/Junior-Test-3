import {createActions} from 'redux-actions';

export const {pushToFavourite, sliceFromFavourite} = createActions(
    'PUSH_TO_FAVOURITE',
    'SLICE_FROM_FAVOURITE'
);
