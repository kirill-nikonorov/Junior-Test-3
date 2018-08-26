import {handleActions} from 'redux-actions';
import {fromJS} from 'immutable';

export const videoPaginationReducer = ({types: [requestType, successType]}) => {
    return handleActions(
        {
            [requestType]: state => {
                return state.set('isFetching', true);
            },
            [successType]: (state, {payload: {results, hasMore}}) => {
                return state.withMutations(map => {
                    map.set('isFetching', false);
                    map.updateIn(['results'], (list = fromJS([])) => list.concat(fromJS(results)));
                    map.set('hasMore', hasMore);
                });
            }
        },
        fromJS({})
    );
};
