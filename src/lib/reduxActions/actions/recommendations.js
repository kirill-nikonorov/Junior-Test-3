import {createActions} from 'redux-actions';

export const {recommendationsRequest, recommendationsSuccess} = createActions(
    'RECOMMENDATIONS_REQUEST',
    'RECOMMENDATIONS_SUCCESS'
);
