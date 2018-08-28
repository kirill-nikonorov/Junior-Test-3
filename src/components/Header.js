import React from 'react';
import {hot} from 'react-hot-loader';
import {Input, Menu} from 'antd';
import styled from 'styled-components';
import {object} from 'prop-types';
import 'antd/dist/antd.css';

const {Search} = Input;

const HeaderContent = styled.div`
    min-height: 64px;
    background-color: #000;

    align-items: center;
    justify-content: start;
    display: grid;
    grid-template-columns: 130px 250px 1fr;
    grid-gap: 5px;

    @media (max-width: 600px) {
        justify-content: center;
        justify-items: center;

        grid-gap: 0;
        grid-template-rows: 64px 50px;
        grid-template-columns: 300px;
    }
`;

const Logo = styled.img`
    margin: 15px;
    @media (max-width: 600px) {
        display: none;
        grid-column: [logo];
    }
`;
const HeaderSearch = styled(Search)`
    display: block;
    width: 200px;
    margin: 15px;
    justify-self: end;
    @media (max-width: 600px) {
        justify-self: center;
    }
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
            <div>
                <HeaderContent>
                    <Logo src="logo.jpg" width="100px" height="40px" onClick={this.pushHistory} />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{
                            lineHeight: '64px'
                        }}
                        onClick={this.pushHistory}
                        selectedKeys={[`${menuItemName}`]}>
                        <Menu.Item key="/">Популярные</Menu.Item>
                        <Menu.Item key="/favourite">Избранное</Menu.Item>
                    </Menu>
                    <HeaderSearch
                        onSearch={this.handleSearchClick}
                        placeholder="input film name"
                        enterButton="Go"
                    />
                </HeaderContent>
            </div>
        );
    }
}

export default hot(module)(Header);

/*






import React from 'react';
import {hot} from 'react-hot-loader';
import {Input, Menu} from 'antd';
import styled from 'styled-components';
import {object} from 'prop-types';

const {Search} = Input;

const HeaderContent = styled.div`
    min-height: 64px;
    background-color: #000;

    align-items: center;
    justify-content: start;

    display: grid;
    grid-template-columns:130px 250px 1fr ;
    grid-gap: 5px;

    @media (max-width: 600px) {
        justify-content: center ;
        justify-items: center ;

        grid-template-rows: 64px 64px ;
        grid-template-columns: 300px;
  }
`;

const Logo = styled.img`
        margin: 15px;
        @media (max-width: 600px) {
        display: none ;
        grid-column : [logo];
  }
`;

const SearchContainer = styled.div`
                        margin: 0 15px;
                        width: 200px;
                        justify-self: right;

                         @media (max-width: 600px) {
                         justify-self: center;

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

    pushHistory = ({key}) => {
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
                <Logo
                    src="logo.jpg"
                    width="100px"
                    height="40px"
                />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{
                        lineHeight: '64px'
                    }}
                    onClick={this.pushHistory}
                    selectedKeys={[`${menuItemName}`]}>
                    <Menu.Item key="/">Популярные</Menu.Item>
                    <Menu.Item key="/favourite">Избранное</Menu.Item>
                </Menu>
                <SearchContainer>
                    <Search
                        onSearch={this.handleSearchClick}
                        placeholder="input film name"
                        enterButton="Go"
                    />
                </SearchContainer>
            </HeaderContent>
        );
    }
}

export default hot(module)(Header);

*/
