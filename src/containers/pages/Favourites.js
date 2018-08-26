import React from 'react';
import {compose} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import MovieCartContainer from '../infoContainers/MovieBasicInfoCardContainer';

import {loadMovieById, addToFavourite, deleteFromFavourite} from '../../actions/index';
import {showInfoNotificationWithButton} from '../../service/index';

import {fromJS} from 'immutable';
import styled from 'styled-components';
import {object, func} from 'prop-types';

const MovieContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

class Content extends React.Component {
    static propTypes = {
        movieEntities: object.isRequired,
        favourites: object.isRequired,
        history: object.isRequired,
        addToFavourite: func.isRequired,
        deleteFromFavourite: func.isRequired,
        loadMovieById: func.isRequired
    };

    toggleFavouriteWithNotification = (id, isFavourite, movie, favourites) => {
        const {addToFavourite, deleteFromFavourite} = this.props,
            title = movie.get('title'),
            dataOfStarring = favourites.get(id);
        if (isFavourite) {
            deleteFromFavourite(id);
            showInfoNotificationWithButton(
                `Вы удалили "${title}" из списка избранных , вернуть ?`,
                () => {
                    addToFavourite(id, dataOfStarring);
                }
            );
        } else addToFavourite(id);
    };

    renderMovie = movie => {
        const id = `${movie.get('id')}`,
            {history} = this.props;

        return (
            <MovieCartContainer
                movie={movie}
                key={id}
                history={history}
                onToggleFavourite={(id, isFavourite, movie, favourites) => {
                    this.toggleFavouriteWithNotification(id, isFavourite, movie, favourites);
                }}
            />
        );
    };

    render() {
        const {movieEntities, favourites} = this.props,
            movies = favourites
                .sort((f, s) => {
                    if (f > s) {
                        return -1;
                    }
                    if (f < s) {
                        return 1;
                    }
                    if (f === s) {
                        return 0;
                    }
                })
                .reduce((movies, val, id) => {
                    const entity = movieEntities.get(`${id}`);
                    return entity ? movies.push(entity) : movies;
                }, fromJS([]));

        return (
            <div>
                {!movies.isEmpty() ? (
                    <MovieContainer>{movies.map(this.renderMovie)}</MovieContainer>
                ) : (
                    <h2>You don't have any favourite film</h2>
                )}
            </div>
        );
    }

    componentWillMount() {
        const {loadMovieById, movieEntities, favourites} = this.props;
        favourites.keySeq().forEach(key => {
            if (!movieEntities.has(`${key}`)) loadMovieById(key);
        });
    }

    shouldComponentUpdate({favourites, movieEntities}) {
        return (
            !favourites.equals(this.props.favourites) ||
            !movieEntities.equals(this.props.movieEntities)
        );
    }
}

const mapStateToProps = (state, {history}) => {
    const pagination = state.get('pagination'),
        favourites = pagination.get('favourites'),
        entities = state.get('entities'),
        movieEntities = entities.get('movies');
    return {
        movieEntities,
        favourites,
        history
    };
};

export default compose(
    hot(module),
    connect(
        mapStateToProps,
        {addToFavourite, deleteFromFavourite, loadMovieById}
    )
)(Content);
