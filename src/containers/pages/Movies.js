import React from 'react';
import {compose, bindActionCreators} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import MovieBasicInfoCardContainer from '../infoContainers/MovieBasicInfoCardContainer';
import qs from 'qs';
import {fromJS} from 'immutable';

import {func, object, number, bool, shape, string} from 'prop-types';
import {loadPopularMoviesPage, loadMoviesByNamePage} from '../../actions/index';
import {MoviesContainer} from '../assets/styles';

class Movies extends React.Component {
    static propTypes = {
        history: object.isRequired,
        page: number.isRequired,
        movies: object.isRequired,
        hasMore: bool.isRequired,
        isFetching: bool.isRequired,
        currentPagination: object.isRequired,
        loadMovies: func.isRequired
    };

    renderMovie = movie => {
        const id = movie.get('id'),
            {history} = this.props;

        return <MovieBasicInfoCardContainer movie={movie} key={id} history={history} />;
    };

    loadMore = page => {
        const {loadMovies} = this.props;
        loadMovies(page);
    };

    render() {
        const {hasMore, isFetching, movies, page} = this.props;

        return (
            <InfiniteScroll
                pageStart={page}
                loadMore={() => {
                    this.loadMore(page + 1);
                }}
                hasMore={hasMore && !isFetching}
                loader={<div key={0}>Loading ...</div>}>
                {movies ? (
                    <MoviesContainer>{movies.map(this.renderMovie)}</MoviesContainer>
                ) : (
                    <h2>almost ready</h2>
                )}
            </InfiniteScroll>
        );
    }

    shouldComponentUpdate({currentPagination}) {
        return !currentPagination.equals(this.props.currentPagination);
    }
}

const mapStateToProps = state => {
    const movieEntities = state.get('entities').get('movies'),
        pagination = state.get('pagination');

    return {
        movieEntities,
        pagination
    };
};

const mergeProps = ({movieEntities, pagination}, dispatchProps, {history, location: {search}}) => {
    const searchObj = qs.parse(search.substring(1));
    const currentPagination = choseNeededPagination(searchObj, pagination),
        isFetching = currentPagination.get('isFetching') || false,
        ids = currentPagination.get('ids') || fromJS([]),
        page = currentPagination.get('page') || 0,
        hasMore =
            typeof currentPagination.get('hasMore') === 'undefined'
                ? true
                : currentPagination.get('hasMore'),
        movies = ids.map(id => movieEntities.get(`${id}`));

    const actions = choseNeededAction(searchObj, dispatchProps);

    return {
        movies,
        page,
        hasMore,
        isFetching,
        currentPagination,
        history,
        ...actions
    };
};

const choseNeededPagination = ({name}, pagination) => {
    const searchedName = name && name.toLowerCase();
    return searchedName
        ? pagination.get('searched').get(searchedName) || fromJS({})
        : pagination.get('popular');
};

const choseNeededAction = ({name}, {loadMoviesByNamePage, loadPopularMoviesPage}) => {
    const searchedName = name && name.toLowerCase();

    const loadMovies = searchedName
        ? page => loadMoviesByNamePage(page, searchedName)
        : loadPopularMoviesPage;

    return {loadMovies};
};

export default compose(
    hot(module),
    connect(
        mapStateToProps,
        {loadMoviesByNamePage, loadPopularMoviesPage},
        mergeProps
    )
)(Movies);
