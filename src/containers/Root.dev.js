import React from 'react';
import {hot} from 'react-hot-loader';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import DevTools from './DevTools';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import {Header} from '../components';
import Movies from './pages/Movies';
import Favourites from './pages/Favourites';
import MovieFullInfoPage from './pages/MovieFullInfoPage';

import {Layout, Row, Col, BackTop} from 'antd';

const {Content} = Layout;

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

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <Row type="flex" justify="space-around">
                <Col xs={{span: 24}} md={{span: 18}}>
                    <Layout style={{minHeight: '100vh'}}>
                        <Route component={Header} />
                        <Content style={{backgroundColor: `#D3D3D3`}}>
                            <Switch>
                                <Route path="/favourite" component={Favourites} />
                                <Route path="/:id" component={MovieFullInfoPage} />
                                <Route path="/" component={Movies} />
                            </Switch>
                            <BackTop>
                                <UpButton>UP</UpButton>
                            </BackTop>
                        </Content>
                        <DevTools />
                    </Layout>
                </Col>
            </Row>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object
};

export default hot(module)(Root);

{
    /*                     <button style={{position: 'absolute', zIndex: '900'}}
                            onClick={() => console.log(store.getState().toJS())}>logStore
                    </button>*/
}
