import React from 'react';
import {compose} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';

import MovieBasicInfoCardContainer from '../infoContainers/MovieBasicInfoCardContainer';
import MovieAdditionalInfo from '../infoContainers/MovieAdditionalInfoContainer';
import {MovieBigCard} from '../../components/index';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';
import {loadMovieById} from '../../actions/index';

class MovieFullInfoPage extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        movie: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        const {id, movie, history} = this.props;

        return (
            <div style={{padding: '5px'}}>
                {movie.isEmpty() ? null : (
                    <MovieBasicInfoCardContainer movie={movie} Card={MovieBigCard} />
                )}
                <MovieAdditionalInfo id={id} history={history} />
            </div>
        );
    }

    componentWillMount() {
        const {loadMovieById, movie, id} = this.props;
        if (movie.isEmpty()) loadMovieById(id);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillUpdate({id}) {
        if (id !== this.props.id) window.scrollTo(0, 0);
    }

    shouldComponentUpdate({movie, id}) {
        return !movie.equals(this.props.movie) || id !== this.props.id;
    }
}

const mapStateToProps = (
    state,
    {
        history,
        match: {
            params: {id}
        }
    }
) => {
    const movie =
        state
            .get('entities')
            .get('movies')
            .get(id) || fromJS({});
    return {
        id,
        movie,
        history
    };
};

export default compose(
    hot(module),
    connect(
        mapStateToProps,
        {loadMovieById}
    )
)(MovieFullInfoPage);
