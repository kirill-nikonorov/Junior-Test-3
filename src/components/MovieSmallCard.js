import React from 'react';
import {hot} from 'react-hot-loader';
import styled from 'styled-components';
import {string, object, bool, func, number, shape, array} from 'prop-types';

import {StarredImage} from './';

const CuttedString = styled.div`
    white-space: nowrap;
    height: 25px;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 200px;
`;

const Title = CuttedString.extend`
    font-size: 110%;
    font-weight: bold;
`;

const CardContainer = styled.div`
    margin: 5px;
    display: inline-block;
    background-color: #ffffff;
`;

const MovieSmallCard = ({
    movie: {posterPath, title, genreIds},
    onFilmClick,
    genres,
    isFavourite,
    onToggleFavourite,
    dateOfStarring
}) => {
    const genresString = genreIds.reduce(
        (str, id, index, arr) =>
            `${str + (genres.get(`${id}`) && genres.get(`${id}`).get('name'))}
                ${arr.length > index + 1 ? ', ' : ''}`,
        ''
    );
    return (
        <CardContainer>
            <StarredImage
                onImageClick={onFilmClick}
                onStarClick={onToggleFavourite}
                isFavourite={isFavourite}
                dateOfStarring={dateOfStarring}
                posterPath={posterPath}
                size={300}
                title={title}
            />
            <Title onClick={onFilmClick}>{title}</Title>
            <CuttedString>{`${genresString}`}</CuttedString>
        </CardContainer>
    );
};

MovieSmallCard.propTypes = {
    movie: shape({
        posterPath: string.isRequired,
        title: string.isRequired,
        genreIds: array.isRequired
    }).isRequired,
    onFilmClick: func.isRequired,
    genres: object.isRequired,
    isFavourite: bool.isRequired,
    onToggleFavourite: func.isRequired,
    dateOfStarring: number
};

export default hot(module)(MovieSmallCard);
