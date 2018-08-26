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
        component: func,
        onFilmClick: func,
        genres: object.isRequired,
        favourites: object.isRequired,
        addToFavourite: func.isRequired,
        deleteFromFavourite: func.isRequired
    };

    handleFilmClick = id => {
        const {history} = this.props;
        history && history.push(`/${id}`);
    };

    toggleFavourite = (id, isFavourite) => {
        const {addToFavourite, deleteFromFavourite} = this.props;
        if (isFavourite) deleteFromFavourite(`${id}`);
        else addToFavourite(`${id}`);
    };

    render() {
        const {
                component = MovieSmallCard,
                genres,
                favourites,
                movie,
                onToggleFavourite = (id, isFavourite) => {
                    this.toggleFavourite(id, isFavourite);
                },
                onFilmClick = () => {
                    this.handleFilmClick(id);
                }
            } = this.props,
            id = `${movie.get('id')}`,
            isFavourite = favourites.has(`${id}`);

        return React.createElement(component, {
            movie: movie.toJS(),
            genres: genres,
            isFavourite: isFavourite,
            dateOfStarring: favourites.get(id),
            onFilmClick: onFilmClick,
            onToggleFavourite: () => onToggleFavourite(id, isFavourite, movie, favourites)
        });
    }

    shouldComponentUpdate({genres, favourites, movie}) {
        return (
            !genres.equals(this.props.genres) ||
            !favourites.equals(this.props.favourites) ||
            !movie.equals(this.props.movie)
        );
    }
}

const mapStateToProps = (state, {movie, history, onToggleFavourite, component, onFilmClick}) => {
    const favourites = state.get('pagination').get('favourites'),
        genres = state.get('entities').get('genres') || fromJS({});
    return {
        movie,
        genres,
        favourites,
        history,
        onToggleFavourite,
        component,
        onFilmClick
    };
};

export default compose(
    hot(module),
    connect(
        mapStateToProps,
        {addToFavourite, deleteFromFavourite}
    )
)(MovieBasicInfoCardContainer);