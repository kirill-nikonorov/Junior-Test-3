import React from 'react';
import {compose} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import MovieBasicInfoCardContainer from '../infoContainers/MovieBasicInfoCardContainer';

import {loadMovieById, addMovieToFavourite, deleteMovieFromFavourite} from '../../actions/index';
import {showInfoNotificationWithButton} from '../../service/index';

import {fromJS} from 'immutable';
import {object, func} from 'prop-types';

import {MoviesContainer} from '../assets/styles';

class Content extends React.Component {
    static propTypes = {
        movieEntities: object.isRequired,
        favourites: object.isRequired,
        history: object.isRequired,
        addMovieToFavourite: func.isRequired,
        deleteMovieFromFavourite: func.isRequired,
        loadMovieById: func.isRequired
    };

    toggleFavouriteWithNotification = (id, isFavourite) => {
        const {
                addMovieToFavourite,
                deleteMovieFromFavourite,
                favourites,
                movieEntities
            } = this.props,
            dataOfStarring = favourites.get(id),
            title = movieEntities.get(`${id}`).get('title');

        if (isFavourite) {
            deleteMovieFromFavourite(id);
            showInfoNotificationWithButton(
                `Вы удалили "${title}" из списка избранных , вернуть ?`,
                () => {
                    addMovieToFavourite(id, dataOfStarring);
                }
            );
        } else addMovieToFavourite(id);
    };

    renderMovie = movie => {
        const id = `${movie.get('id')}`,
            {history} = this.props;

        return (
            <MovieBasicInfoCardContainer
                movie={movie}
                key={id}
                history={history}
                onToggleFavourite={this.toggleFavouriteWithNotification}
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
                .reduce((movies, timeOfAdding, id) => {
                    const movie = movieEntities.get(`${id}`);
                    return movie ? movies.push(movie) : movies;
                }, fromJS([]));

        return (
            <div>
                {movies.isEmpty() ? (
                    <h2>You don't have any favourite film</h2>
                ) : (
                    <MoviesContainer>{movies.map(this.renderMovie)}</MoviesContainer>
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
        {addMovieToFavourite, deleteMovieFromFavourite, loadMovieById}
    )
)(Content);
