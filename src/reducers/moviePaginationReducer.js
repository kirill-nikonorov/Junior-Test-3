import {handleActions} from 'redux-actions';
import {fromJS} from 'immutable';

export const moviePaginationReducer = ({types: [requestType, successType]}) => {
    return handleActions(
        {
            [requestType]: state => {
                return state.set('isFetching', true);
            },
            [successType]: (state, {payload: {result: ids, totalPages, page, hasMore}}) => {
                return state.withMutations(map => {
                    map.set('isFetching', false);
                    if (ids) map.updateIn(['ids'], (list = fromJS([])) => list.concat(ids));
                    if (totalPages) map.set('totalPages', totalPages);
                    if (page) map.set('page', page);
                    if (typeof hasMore !== undefined) map.set('hasMore', hasMore);
                });
            }
        },
        fromJS({})
    );
};
