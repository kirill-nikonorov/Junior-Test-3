import {render} from 'react-dom';
import React from 'react';
import configureStore from './store/configureStore';
import {BrowserRouter as Router} from 'react-router-dom';
import Root from './containers/Root';
import {Provider} from 'react-redux';

let store = configureStore();

render(
    <Router>
        <Provider store={store}>
            <Root />
        </Provider>
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
