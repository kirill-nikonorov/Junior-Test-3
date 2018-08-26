import {fromJS} from 'immutable';
import {moviePaginationReducer} from './moviePaginationReducer';

export const paginate = ({
    types,
    types: [requestType, successType],
    mapActionToKey,
    currentPaginationReducer = moviePaginationReducer
}) => {
    return (state = fromJS({}), action) => {
        switch (action.type) {
            case requestType.toString():
            case successType.toString():
                const key = mapActionToKey(action);
                return state.set(key, currentPaginationReducer({types})(state.get(key), action));
            default:
                return state;
        }
    };
};
