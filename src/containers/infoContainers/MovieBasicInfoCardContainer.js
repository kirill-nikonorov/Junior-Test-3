import React from 'react';
import {compose} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {MovieSmallCard} from '../../components/index';
import {addToFavourite, deleteFromFavourite} from '../../actions/index';

import {fromJS} from 'immutable';
import {object, func} from 'prop-types';

class MovieBasicInfoCardContainer extends React.Component {
    static propTypes = {
        movie: object.isRequired,
        history: object,
        onToggleFavourite: func,
        Component: func,
        onFilmAttributeClick: func,
        genres: object.isRequired,
        favourites: object.isRequired,
        addToFavourite: func.isRequired,
        deleteFromFavourite: func.isRequired
    };

    toggleFavourite = (id, isFavourite) => {
        const {addToFavourite, deleteFromFavourite} = this.props;
        if (isFavourite) deleteFromFavourite(`${id}`);
        else addToFavourite(`${id}`);
    };

    render() {
        const {
                Component = MovieSmallCard,
                history,
                genres,
                favourites,
                movie,
                onToggleFavourite = (id, isFavourite) => {
                    this.toggleFavourite(id, isFavourite);
                },
                onFilmAttributeClick
            } = this.props,
            id = `${movie.get('id')}`,
            isFavourite = favourites.has(id);

        return (
            <Component
                history={history}
                movie={movie.toJS()}
                genres={genres}
                isFavourite={isFavourite}
                dateOfStarring={favourites.get(id)}
                onFilmAttributeClick={onFilmAttributeClick}
                onToggleFavourite={() => onToggleFavourite(id, isFavourite, movie, favourites)}
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
    {movie, history, onToggleFavourite, component, onFilmAttributeClick}
) => {
    const favourites = state.get('pagination').get('favourites'),
        genres = state.get('entities').get('genres') || fromJS({});
    return {
        movie,
        genres,
        favourites,
        history,
        onToggleFavourite,
        component,
        onFilmAttributeClick
    };
};

export default compose(
    hot(module),
    connect(
        mapStateToProps,
        {addToFavourite, deleteFromFavourite}
    )
)(MovieBasicInfoCardContainer);
