import React from 'react';
import {hot} from 'react-hot-loader';
import {Input, Menu} from 'antd';
import styled from 'styled-components';
import {object} from 'prop-types';
import 'antd/dist/antd.css';

const {Search} = Input;

const MAX_WIDTH_TO_DELETE_LOGO = 600;
const MAX_WIDTH_WITH_MULTIlINES = 480;

const HeaderContent = styled.div`
    display: flex;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;

    min-height: 64px;
    background-color: #000;
`;

const Logo = styled.img`
    margin-left: 15px;
    @media (max-width: ${MAX_WIDTH_TO_DELETE_LOGO}px) {
        display: none;
    }
`;

const HeaderSearch = styled(Search)`
    max-width: 200px !important;
    margin: 15px !important;
    margin-left: auto !important;

    @media (max-width: ${MAX_WIDTH_WITH_MULTIlINES}px) {
        margin-left: 15px !important;
    }
`;
const HeaderMenu = styled(Menu)`
    line-height: 64px !important;
    background: black !important;

    margin: 0 15px !important;
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

    pushHistory = ({key = '/'}) => {
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
                <Logo src="logo.jpg" width="100px" height="40px" onClick={this.pushHistory} />
                <HeaderMenu
                    theme="dark"
                    mode="horizontal"
                    onClick={this.pushHistory}
                    selectedKeys={[`${menuItemName}`]}>
                    <Menu.Item key="/">Популярные</Menu.Item>
                    <Menu.Item key="/favourite">Избранное</Menu.Item>
                </HeaderMenu>
                <HeaderSearch
                    onSearch={this.handleSearchClick}
                    placeholder="input film name"
                    enterButton="Go"
                />
            </HeaderContent>
        );
    }
}

export default hot(module)(Header);
