import React from 'react';
import {hot} from 'react-hot-loader';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import {Header} from '../components';
import Movies from './pages/Movies';
import Favourites from './pages/Favourites';
import MovieFullInfoPage from './pages/MovieFullInfoPage';

import {BackTop} from 'antd';

const UpButton = styled.div`
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #1088e9;
    color: #fff;
    text-align: center;
    font-size: 20px;
`;
const AppContainer = styled.div`
    margin: 0 auto;
    min-height: 100vh;
    background-color: #d3d3d3;
    max-width: 1030px;

    justify-content: center;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 10px;
`;

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <AppContainer>
                <Route component={Header} />
                <Switch>
                    <Route path="/favourite" component={Favourites} />
                    <Route path="/:id" component={MovieFullInfoPage} />
                    <Route path="/" component={Movies} />
                </Switch>
                <BackTop>
                    <UpButton>UP</UpButton>
                </BackTop>
            </AppContainer>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object
};

export default hot(module)(Root);
