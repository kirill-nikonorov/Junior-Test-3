import {CALL_API} from '../middlewares/api';
import {Schemas} from '../constants/schemas';
import {searchRequest, searchSuccess} from '../lib/reduxActions/actions';

const fetchMoviesByNamePage = (page, name) => ({
    [CALL_API]: {
        endpoint: `/search/movie`,
        types: [searchRequest, searchSuccess],
        schema: Schemas.MOVIE_ARRAY,
        queryParams: {page: page, query: name},
        extractDataForNormalizationFromResponseData: data => data.results,
        extractReadyToUseDataFromResponseData: ({page, totalPages}) => ({
            page,
            totalPages,
            hasMore: totalPages > page
        })
    },
    name
});

export const loadMoviesByNamePage = (page = 1, name) => dispatch => {
    //console.log("loadMoviesWithName = " , name , page );
    dispatch(fetchMoviesByNamePage(page, name));
};
