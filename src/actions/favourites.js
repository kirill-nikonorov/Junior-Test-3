import {pushToFavourite} from '../lib/reduxActions/actions';

import {sliceFromFavourite} from '../lib/reduxActions/actions';

export const addToFavourite = (id, time = Date.now()) => dispatch => {
    dispatch(
        pushToFavourite({
            id: `${id}`,
            time
        })
    );
};

export const deleteFromFavourite = id => dispatch => {
    dispatch(sliceFromFavourite({id: `${id}`}));
};
