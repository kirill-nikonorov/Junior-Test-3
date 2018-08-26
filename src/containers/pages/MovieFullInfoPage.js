import React from 'react';
import {compose} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';

import MovieBasicInfoCardContainer from '../infoContainers/MovieBasicInfoCardContainer';
import MovieAdditionalInfo from '../infoContainers/MovieAdditionalInfoContainer';
import {MovieBigCard} from '../../components/index';
import PropTypes from 'prop-types';

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
                <MovieBasicInfoCardContainer movie={movie} component={MovieBigCard} />
                <MovieAdditionalInfo id={id} history={history} />
            </div>
        );
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
    const movie = state
        .get('entities')
        .get('movies')
        .get(id);
    return {
        id,
        movie,
        history
    };
};

export default compose(
    hot(module),
    connect(mapStateToProps)
)(MovieFullInfoPage);
