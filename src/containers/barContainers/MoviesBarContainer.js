import React from 'react';
import {compose} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {Bar} from '../../components/index';

import {fromJS} from 'immutable';
import MovieBasicInfoCardContainer from '../infoContainers/MovieBasicInfoCardContainer';
import {string, object, bool, func, number} from 'prop-types';

const loadIfNeeded = props => {
    const {id, currentPaginationIds, isCurrentPaginationFetching, loadMore, hasMore} = props;

    if (currentPaginationIds.isEmpty() && hasMore && !isCurrentPaginationFetching) {
        loadMore(id);
    }
};

class MoviesBarContainer extends React.Component {
    static propTypes = {
        id: string.isRequired,
        paginationName: string.isRequired,
        barName: string.isRequired,
        loadMore: func.isRequired,
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
                id,
                barName,
                movieEntities,
                hasMore,
                currentPaginationIds,
                isCurrentPaginationFetching,
                loadMore,
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
                        loadMore={() => loadMore(id, currentPaginationPage + 1)}
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

const mapStateToProps = (state, {id, paginationName, barName = '', loadMore, history}) => {
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
        id,
        movieEntities,
        currentPaginationPage,
        isCurrentPaginationFetching,
        currentPaginationIds,
        hasMore,
        loadMore
    };
};

export default compose(
    hot(module),
    connect(mapStateToProps)
)(MoviesBarContainer);
