import {CALL_API} from '../middlewares/api';
import {Schemas} from '../constants/schemas';
import {genreRequest, genreSuccess} from '../lib/reduxActions/actions';

const fetchGenres = () => ({
    [CALL_API]: {
        endpoint: `/genre/movie/list`,
        types: [genreRequest, genreSuccess],
        schema: Schemas.GENRES,
        extractDataForNormalizationFromResponseData: data => data.genres
    }
});

export const loadGenres = () => dispatch => {
    dispatch(fetchGenres());
};
