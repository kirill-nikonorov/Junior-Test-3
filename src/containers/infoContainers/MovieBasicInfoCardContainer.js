import React from 'react';
import {compose} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {MovieSmallCard} from '../../components/index';
import {addMovieToFavourite, deleteMovieFromFavourite} from '../../actions/index';

import {fromJS} from 'immutable';
import {object, func} from 'prop-types';

class MovieBasicInfoCardContainer extends React.Component {
    static propTypes = {
        movie: object.isRequired,
        history: object,
        onToggleFavourite: func,
        Card: func,
        onFilmAttributeClick: func,
        genres: object.isRequired,
        favourites: object.isRequired,
        addMovieToFavourite: func.isRequired,
        deleteMovieFromFavourite: func.isRequired
    };

    toggleFavourite = (id, isFavourite) => {
        const {addMovieToFavourite, deleteMovieFromFavourite} = this.props;
        if (isFavourite) deleteMovieFromFavourite(id);
        else addMovieToFavourite(id);
    };

    render() {
        const {
            Card = MovieSmallCard,
            history,
            genres,
            favourites,
            movie,
            onToggleFavourite = this.toggleFavourite,
            onFilmAttributeClick
        } = this.props;
        const id = `${movie.get('id')}`,
            isFavourite = favourites.has(id);

        return (
            <Card
                history={history}
                movie={movie.toJS()}
                genres={genres}
                isFavourite={isFavourite}
                dateOfStarring={favourites.get(id)}
                onFilmAttributeClick={onFilmAttributeClick}
                onToggleFavourite={() => onToggleFavourite(id, isFavourite)}
            />
        );
    }

    shouldComponentUpdate({genres, favourites, movie}) {
        return (
            !genres.equals(this.props.genres) ||
            !favourites.equals(this.props.favourites) ||
            !movie.equals(this.props.movie)
        );
    }
}

const mapStateToProps = (
    state,
    {movie, history, onToggleFavourite, Card, onFilmAttributeClick}
) => {
    const favourites = state.get('pagination').get('favourites'),
        genres = state.get('entities').get('genres') || fromJS({});
    return {
        movie,
        genres,
        favourites,
        history,
        onToggleFavourite,
        Card,
        onFilmAttributeClick
    };
};

export default compose(
    hot(module),
    connect(
        mapStateToProps,
        {addMovieToFavourite, deleteMovieFromFavourite}
    )
)(MovieBasicInfoCardContainer);
