import {CALL_API} from '../middlewares/api';
import {Schemas} from '../constants/schemas';
import {similarMoviesRequest, similarMoviesSuccess} from '../lib/reduxActions/actions';

const fetchSimilarMoviesByMovieId = (id, page) => ({
    [CALL_API]: {
        endpoint: `/movie/${id}/similar`,
        types: [similarMoviesRequest, similarMoviesSuccess],
        schema: Schemas.MOVIE_ARRAY,
        extractDataForNormalizationFromResponseData: data => data.results,
        extractReadyToUseDataFromResponseData: ({page, totalPages}) => ({
            page,
            totalPages,
            hasMore: !!(totalPages && page && totalPages > page)
        }),
        queryParams: {page}
    },
    id
});

export const loadSimilarMoviesByMovieId = (movieId, page = 1) => dispatch => {
    dispatch(fetchSimilarMoviesByMovieId(movieId, page));
};
