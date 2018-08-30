import React from 'react';
import {hot} from 'react-hot-loader';
import {bool, func, number, object, shape, string} from 'prop-types';
import DevTools from './DevTools';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import {Header} from '../components';
import Movies from './pages/Movies';
import Favourites from './pages/Favourites';
import MovieFullInfoPage from './pages/MovieFullInfoPage';

import {BackTop} from 'antd';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {loadGenres} from '../actions';

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

class Root extends React.Component {
    static propTypes = {
        genres: object.isRequired,
        loadGenres: func.isRequired
    };
    render() {
        return (
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
                <DevTools />
            </AppContainer>
        );
    }

    componentWillMount() {
        const {genres, loadGenres} = this.props;
        if (genres.size === 0) {
            loadGenres();
        }
    }
}

const mapStateToProps = state => {
    const genres = state.get('entities').get('genres');
    return {
        genres
    };
};

export default compose(
    hot(module),
    connect(
        mapStateToProps,
        {loadGenres},
        undefined,
        {pure: false}
    )
)(Root);
