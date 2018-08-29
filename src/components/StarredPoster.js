import React from 'react';
import {hot} from 'react-hot-loader';
import styled from 'styled-components';
import {Poster} from './';

import {Star} from './';
import {string, bool, func, number} from 'prop-types';

const PosterContainer = styled.div`
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
`;

const StarredPoster = ({
    posterPath,
    title,
    isFavourite,
    onStarClick,
    onImageClick,
    dateOfStarring,
    size = 300
}) => {
    return (
        <PosterContainer>
            <Star onClick={onStarClick} isFavourite={isFavourite} dateOfStarring={dateOfStarring} />
            <Poster onClick={onImageClick} posterPath={posterPath} size={size} title={title} />
        </PosterContainer>
    );
};

StarredPoster.propTypes = {
    posterPath: string.isRequired,
    title: string.isRequired,
    onImageClick: func.isRequired,
    onStarClick: func.isRequired,
    dateOfStarring: number,
    isFavourite: bool.isRequired,
    size: number
};

export default hot(module)(StarredPoster);
