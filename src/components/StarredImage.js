import React from 'react';
import {hot} from 'react-hot-loader';
import {IMAGE_URL} from '../constants/apiConstants';
import styled from 'styled-components';

import {Star} from './';
import {string, bool, func, number} from 'prop-types';

const ImageContainer = styled.div`
    position: relative;
    display: inline-block;
    overflow: hidden;
`;

const StarredImageContainer = ({
    posterPath,
    title,
    isFavourite,
    onStarClick,
    onImageClick,
    dateOfStarring,
    size = 300
}) => {
    return (
        <ImageContainer>
            <Star onClick={onStarClick} isFavourite={isFavourite} dateOfStarring={dateOfStarring} />
            <img
                onClick={onImageClick}
                src={`${IMAGE_URL}/w${size}${posterPath}`}
                alt={`${title}`}
                height={`${size}px`}
                width={`${size / 1.5}px`}
            />
        </ImageContainer>
    );
};

StarredImageContainer.propTypes = {
    posterPath: string.isRequired,
    title: string.isRequired,
    onImageClick: func.isRequired,
    onStarClick: func.isRequired,
    dateOfStarring: number,
    isFavourite: bool.isRequired,
    size: number
};

export default hot(module)(StarredImageContainer);
