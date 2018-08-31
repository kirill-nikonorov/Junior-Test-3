import {CALL_API} from '../middlewares/api';
import {Schemas} from '../constants/schemas';
import {popularRequest, popularSuccess} from '../lib/reduxActions/actions';

const fetchPopularMovies = page => ({
    [CALL_API]: {
        endpoint: `/movie/popular`,
        types: [popularRequest, popularSuccess],
        schema: Schemas.MOVIE_ARRAY,
        queryParams: {page: page},
        extractDataForNormalizationFromResponseData: data => data.results,
        extractReadyToUseDataFromResponseData: ({page, totalPages}) => ({
            page,
            totalPages,
            hasMore: !!(totalPages && page && totalPages > page)
        })
    }
});

export const loadPopularMovies = (page = 1) => dispatch => {
    dispatch(fetchPopularMovies(page));
};
