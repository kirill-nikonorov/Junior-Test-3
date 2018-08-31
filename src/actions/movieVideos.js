import {CALL_API} from '../middlewares/api';
import {movieVideosRequest, movieVideosSuccess} from '../lib/reduxActions/actions';

const fetchMovieVideos = id => ({
    [CALL_API]: {
        endpoint: `/movie/${id}/videos`,
        types: [movieVideosRequest, movieVideosSuccess],
        extractReadyToUseDataFromResponseData: ({page, totalPages, results}) => ({
            hasMore: !!(totalPages && page && totalPages > page),
            results
        })
    },
    id
});

export const loadMovieVideos = id => dispatch => {
    dispatch(fetchMovieVideos(id));
};
