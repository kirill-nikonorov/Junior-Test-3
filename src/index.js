import {render} from 'react-dom';
import React from 'react';
import configureStore from './store/configureStore';
import {BrowserRouter as Router} from 'react-router-dom';
import Root from './containers/Root';

let store = configureStore();

render(
    <Router>
        <Root store={store} />
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
