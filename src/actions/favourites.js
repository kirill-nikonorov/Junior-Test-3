import {pushToFavourite} from '../lib/reduxActions/actions';

import {sliceFromFavourite} from '../lib/reduxActions/actions';

export const addMovieToFavourite = (id, time = Date.now()) => dispatch => {
    dispatch(
        pushToFavourite({
            id: `${id}`,
            time
        })
    );
};

export const deleteMovieFromFavourite = id => dispatch => {
    dispatch(sliceFromFavourite({id: `${id}`}));
};
