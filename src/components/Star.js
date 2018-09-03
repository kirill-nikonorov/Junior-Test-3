import React from 'react';
import {hot} from 'react-hot-loader';
import styled from 'styled-components';
import {Tooltip, Icon} from 'antd';
import {bool, func, number} from 'prop-types';

const StarContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
`;

const Star = ({onClick, isFavourite, dateOfStarring}) => {
    let dateSting = '';
    if (dateOfStarring) {
        const date = new Date(dateOfStarring);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        dateSting = date.toLocaleString('ru', options);
    }
    return (
        <StarContainer>
            <Tooltip title={dateSting}>
                <img
                    src={isFavourite ? 'golden-star.png' : 'black-star.png'}
                    width="20px"
                    onClick={onClick}
                />
            </Tooltip>
        </StarContainer>
    );
};

Star.propTypes = {
    onClick: func.isRequired,
    isFavourite: bool.isRequired,
    dateOfStarring: number
};

export default hot(module)(Star);
