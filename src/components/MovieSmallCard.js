import React from 'react';
import {hot} from 'react-hot-loader';
import styled from 'styled-components';
import {string, object, bool, func, number, shape, array} from 'prop-types';

import {StarredPoster} from './';

const CuttedString = styled.div`
    white-space: nowrap;
    height: 25px;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const Title = CuttedString.extend`
    font-size: 110%;
    font-weight: bold;
    cursor: pointer;
`;

const CardContainer = styled.div`
    display: inline-block;
    background-color: #ffffff;
`;
const TextBlock = styled.div`
    padding: 0 5px;
    width: 200px;
`;

const handleFilmAttributeClick = (id, history) => {
    history && history.push(`/${id}`);
};

const MovieSmallCard = ({
    movie: {id, posterPath, title, genreIds},
    size = 300,
    history,
    onFilmAttributeClick = handleFilmAttributeClick,
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
            <StarredPoster
                onImageClick={() => onFilmAttributeClick(id, history)}
                onStarClick={onToggleFavourite}
                isFavourite={isFavourite}
                dateOfStarring={dateOfStarring}
                posterPath={posterPath}
                size={size}
                title={title}
            />
            <TextBlock>
                <Title onClick={() => onFilmAttributeClick(id, history)}>{title}</Title>
                <CuttedString>{`${genresString}`}</CuttedString>
            </TextBlock>
        </CardContainer>
    );
};

MovieSmallCard.propTypes = {
    movie: shape({
        posterPath: string.isRequired,
        title: string.isRequired,
        genreIds: array.isRequired
    }).isRequired,
    size: number,
    history: object,
    onFilmAttributeClick: func,
    genres: object.isRequired,
    isFavourite: bool.isRequired,
    onToggleFavourite: func.isRequired,
    dateOfStarring: number
};

export default hot(module)(MovieSmallCard);
