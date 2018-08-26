import React from 'react';
import {hot} from 'react-hot-loader';
import {Input, Menu} from 'antd';
import styled from 'styled-components';
import {object} from 'prop-types';

const {Search} = Input;

const HeaderContent = styled.div`
    min-height: 64px;
    align-items: center;
    justify-content: space-around;
    align-content: space-between;
    flex-wrap: wrap;
    display: flex;
    background-color: #000;
`;

class Header extends React.Component {
    static propTypes = {
        location: object.isRequired,
        history: object.isRequired
    };

    handleSearchClick = value => {
        if (value.length === 0) return;
        const {history} = this.props;

        history.push(`/?name=${value}`);
    };

    onSelect = ({key}) => {
        const {history} = this.props;
        history.push(key);
    };

    render() {
        const {
            location: {pathname, search}
        } = this.props;
        const menuItemName = pathname + search;

        return (
            <HeaderContent>
                <img
                    src="logo.jpg"
                    width="100px"
                    height="40px"
                    style={{margin: '15px 15px 15px 64px'}}
                />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{lineHeight: '64px'}}
                    onClick={this.onSelect}
                    selectedKeys={[`${menuItemName}`]}>
                    <Menu.Item key="/">Популярные</Menu.Item>
                    <Menu.Item key="/favourite">Избранное</Menu.Item>
                </Menu>

                <Search
                    onSearch={this.handleSearchClick}
                    style={{
                        width: '200px',
                        margin: '15px 64px 15px auto',
                        zIndex: '1'
                    }}
                    placeholder="input film name"
                    enterButton="Go"
                />
            </HeaderContent>
        );
    }
}

export default hot(module)(Header);
