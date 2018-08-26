import React from 'react';
import {hot} from 'react-hot-loader';
import styled from 'styled-components';
import {Spin, Icon} from 'antd';
import {string, object, bool, func} from 'prop-types';

const Content = styled.div`
    display: flex;
    overflow: auto;
`;

const renderSpin = () => {
    const antIcon = <Icon type="loading" style={{fontSize: 60}} spin />;
    return <Spin indicator={antIcon} style={{alignSelf: 'center'}} />;
};
const renderLoadMoreButton = loadMore => {
    return (
        <button
            onClick={loadMore}
            style={{
                backgroundColor: '#2E3B5C',
                alignSelf: 'center',
                height: '70px',
                color: '#ffffff'
            }}>
            loadMore
        </button>
    );
};

class Bar extends React.Component {
    static propTypes = {
        items: object.isRequired,
        hasMore: bool.isRequired,
        loadMore: func,
        isFetching: bool.isRequired,
        barName: string.isRequired,
        renderItem: func.isRequired
    };

    render() {
        const {items, hasMore, loadMore, isFetching, barName, renderItem} = this.props;

        return (
            <div>
                <hr />
                <h2>{barName} :</h2>
                <Content>
                    {items.map(renderItem)}
                    {hasMore && (isFetching ? renderSpin() : renderLoadMoreButton(loadMore))}
                </Content>
            </div>
        );
    }
}

export default hot(module)(Bar);
