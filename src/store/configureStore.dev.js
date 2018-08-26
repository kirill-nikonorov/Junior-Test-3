import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import apiMiddleware from '../middlewares/api';
import DevTools from '../containers/DevTools';
import {fromJS} from 'immutable';

import persistState from 'redux-localstorage';

const config = {
    serialize: subset => JSON.stringify(subset.get('pagination').get('favourites')),
    deserialize: serializedData => {
        const parsedData = JSON.parse(serializedData),
            checkedData = parsedData === null ? {} : parsedData;
        return fromJS({pagination: {favourites: checkedData}});
    },
    merge: (initialState, persistedState) => initialState.mergeDeep(persistedState)
};

const initialState = fromJS({entities: undefined, pagination: undefined});

const configureStore = () => {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            persistState('', config),
            applyMiddleware(thunk, apiMiddleware),
            DevTools.instrument()
        )
    );

    if (module.hot) {
        module.hot.accept('../reducers/rootReducer', () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
};

export default configureStore;
