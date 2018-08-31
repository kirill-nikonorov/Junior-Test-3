import React from 'react';
import {compose} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {Bar} from '../../components/index';

import {fromJS} from 'immutable';
import MovieBasicInfoCardContainer from '../infoContainers/MovieBasicInfoCardContainer';
import {string, object, bool, func, number} from 'prop-types';

const loadIfNeeded = props => {
    const {currentPaginationIds, isCurrentPaginationFetching, loadMovies, hasMore} = props;

    const shouldLoadMovies =
        currentPaginationIds.isEmpty() && hasMore && !isCurrentPaginationFetching;
    if (shouldLoadMovies) {
        loadMovies();
    }
};

class MoviesBarContainer extends React.Component {
    static propTypes = {
        paginationName: string.isRequired,
        barName: string.isRequired,
        loadMovies: func.isRequired,
        history: object.isRequired,
        movieEntities: object.isRequired,
        currentPaginationPage: number.isRequired,
        isCurrentPaginationFetching: bool.isRequired,
        currentPaginationIds: object.isRequired,
        hasMore: bool.isRequired
    };

    renderMovie = movie => {
        const id = `${movie.get('id')}`,
            {history} = this.props;

        return <MovieBasicInfoCardContainer movie={movie} key={id} history={history} />;
    };

    render() {
        const {
                barName,
                movieEntities,
                hasMore,
                currentPaginationIds,
                isCurrentPaginationFetching,
                loadMovies,
                currentPaginationPage
            } = this.props,
            movies = currentPaginationIds.map(id => movieEntities.get(`${id}`));

        return (
            <div>
                {!currentPaginationIds.isEmpty() && (
                    <Bar
                        barName={barName}
                        items={movies}
                        hasMore={hasMore}
                        loadMore={() => loadMovies(currentPaginationPage + 1)}
                        isFetching={isCurrentPaginationFetching}
                        renderItem={this.renderMovie}
                    />
                )}
            </div>
        );
    }

    shouldComponentUpdate({
        movieEntities,
        currentPaginationPage,
        isCurrentPaginationFetching,
        currentPaginationIds,
        hasMore
    }) {
        return (
            !movieEntities.equals(this.props.movieEntities) ||
            currentPaginationPage !== this.props.currentPaginationPage ||
            isCurrentPaginationFetching !== this.props.isCurrentPaginationFetching ||
            !currentPaginationIds.equals(this.props.currentPaginationIds) ||
            hasMore !== this.props.hasMore
        );
    }

    componentWillUpdate(nextProps) {
        loadIfNeeded(nextProps);
    }

    componentWillMount() {
        loadIfNeeded(this.props);
    }
}

const mapStateToProps = (state, {id, paginationName, barName = '', loadMovies, history}) => {
    const pagination = state.get('pagination'),
        movieEntities = state.get('entities').get('movies'),
        paginationPart = pagination.get(paginationName),
        currentPagination = paginationPart.get(id) || fromJS({}),
        currentPaginationPage = currentPagination.get('page') || 0,
        isCurrentPaginationFetching =
            typeof currentPagination.get('isFetching') === 'undefined'
                ? false
                : currentPagination.get('isFetching'),
        currentPaginationIds = currentPagination.get('ids') || fromJS([]),
        hasMore =
            typeof currentPagination.get('hasMore') === 'undefined'
                ? true
                : currentPagination.get('hasMore');

    return {
        barName,
        paginationName,
        history,
        movieEntities,
        currentPaginationPage,
        isCurrentPaginationFetching,
        currentPaginationIds,
        hasMore,
        loadMovies
    };
};

export default compose(
    hot(module),
    connect(mapStateToProps)
)(MoviesBarContainer);
