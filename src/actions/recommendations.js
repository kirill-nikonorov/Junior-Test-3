import {CALL_API} from '../middlewares/api';
import {Schemas} from '../constants/schemas';
import {recommendationsRequest, recommendationsSuccess} from '../lib/reduxActions/actions';

const fetchRecommendationsByMovieId = (id, page) => ({
    [CALL_API]: {
        endpoint: `/movie/${id}/recommendations`,
        types: [recommendationsRequest, recommendationsSuccess],
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

export const loadRecommendationsByMovieId = (movieId, page = 1) => dispatch => {
    dispatch(fetchRecommendationsByMovieId(movieId, page));
};
