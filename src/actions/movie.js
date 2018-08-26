import {CALL_API} from '../middlewares/api';
import {Schemas} from '../constants/schemas';
import {movieRequest, movieSuccess} from '../lib/reduxActions/actions';

const fetchMovieById = movieId => ({
    [CALL_API]: {
        endpoint: `/movie/${movieId}`,
        types: [movieRequest, movieSuccess],
        schema: Schemas.MOVIE,
        extractDataForNormalizationFromResponseData: data => data
    }
});

export const loadMovieById = id => dispatch => {
    //console.log("loadMovieById = " , page);
    dispatch(fetchMovieById(id));
};
