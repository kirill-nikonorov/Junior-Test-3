import React from 'react';
import {hot} from 'react-hot-loader';
import styled from 'styled-components';
import {Button} from 'antd';
import {StarredImage} from './';
import {string, object, bool, func, number, shape, array} from 'prop-types';

const InformationBlock = styled.div`
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 15px;
    flex: auto;
    align-items: center;
    min-width: 333.3px;
`;

const renderFavouriteToggleButton = (isFavourite, onToggleFavourite) => {
    return (
        <Button
            onClick={onToggleFavourite}
            style={{
                backgroundColor: isFavourite ? '#ffe857' : 'white',
                maxWidth: '300px'
            }}>
            {isFavourite ? 'Удалить из Избранного ' : 'Добавить в Избранное'}
        </Button>
    );
};

const MovieBigCard = ({
    movie: {overview, posterPath, title, genreIds, voteAverage, releaseDate},
    genres,
    isFavourite,
    onToggleFavourite,
    dateOfStarring,
    onFilmClick
}) => {
    const genresString = genreIds.reduce(
        (str, id, index, arr) =>
            `${str + (genres.get(`${id}`) && genres.get(`${id}`).get('name'))}
                ${arr.length > index + 1 ? ', ' : ''}`,
        ''
    );

    return (
        <div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <StarredImage
                    onImageClick={onFilmClick}
                    onStarClick={onToggleFavourite}
                    isFavourite={isFavourite}
                    dateOfStarring={dateOfStarring}
                    posterPath={posterPath}
                    size={500}
                    title={title}
                />
                <InformationBlock>
                    <h1>{title}</h1>
                    <h2>{voteAverage} - Рейтинг пользователей </h2>
                    <h2>{releaseDate} - Дата релиза</h2>
                    <h2>{genresString}</h2>
                    {renderFavouriteToggleButton(isFavourite, onToggleFavourite)}
                </InformationBlock>
            </div>
            {overview && (
                <div>
                    <hr />
                    <h2 style={{fontSize: '15px'}}>{overview}</h2>
                </div>
            )}
        </div>
    );
};

MovieBigCard.propTypes = {
    movie: shape({
        posterPath: string.isRequired,
        title: string.isRequired,
        genreIds: array.isRequired,
        overview: string,
        voteAverage: number.isRequired,
        releaseDate: string.isRequired
    }).isRequired,
    onFilmClick: func.isRequired,
    genres: object.isRequired,
    isFavourite: bool.isRequired,
    onToggleFavourite: func.isRequired,
    dateOfStarring: number
};

export default hot(module)(MovieBigCard);
