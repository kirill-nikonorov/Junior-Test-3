import React from 'react';
import {compose, bindActionCreators} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import MovieBasicInfoCardContainer from '../infoContainers/MovieBasicInfoCardContainer';
import qs from 'qs';
import {loadPopularMovies, loadGenres, loadMoviesByName} from '../../actions/index';

import {fromJS} from 'immutable';
import styled from 'styled-components';
import {func, object, number, bool, shape, string} from 'prop-types';

const MovieContainer = styled.div`
    padding: 5px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    justify-content: center;
    grid-gap: 5px;
`;

class Movies extends React.Component {
    static propTypes = {
        location: shape({
            search: string.isRequired
        }).isRequired,
        history: object.isRequired,
        page: number.isRequired,
        movies: object.isRequired,
        hasMore: bool.isRequired,
        ids: object.isRequired,
        isFetching: bool.isRequired,
        movieEntities: object.isRequired,
        currentPagination: object.isRequired,
        genres: object.isRequired,
        loadMovies: func.isRequired,
        loadGenres: func.isRequired
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
                    <MovieContainer>{movies.map(this.renderMovie)}</MovieContainer>
                ) : (
                    <h2>almost ready</h2>
                )}
            </InfiniteScroll>
        );
    }

    componentWillMount() {
        const {genres, loadGenres} = this.props;
        if (genres.size === 0) {
            loadGenres();
        }
    }

    shouldComponentUpdate({currentPagination}) {
        return !currentPagination.equals(this.props.currentPagination);
    }
}

const chosePagination = (search, pagination) => {
    const searchObj = qs.parse(search.substring(1)),
        searchedName = searchObj.name && searchObj.name.toLowerCase();
    return searchedName
        ? pagination.get('searched').get(searchedName) || fromJS({})
        : pagination.get('popular');
};

const mapStateToProps = (state, {history, location: {search}}) => {
    const currentPagination = chosePagination(search, state.get('pagination')),
        entities = state.get('entities'),
        movieEntities = entities.get('movies'),
        genres = entities.get('genres'),
        isFetching = currentPagination.get('isFetching') || false,
        ids = currentPagination.get('ids') || fromJS([]),
        page = currentPagination.get('page') || 0,
        hasMore =
            typeof currentPagination.get('hasMore') === 'undefined'
                ? true
                : currentPagination.get('hasMore'),
        movies = ids.map(id => movieEntities.get(`${id}`));

    //console.log("currentPagination = ", typeof currentPagination.get('hasMore') === "undefined");
    return {
        page,
        movies,
        hasMore,
        ids,
        isFetching,
        movieEntities,
        currentPagination,
        genres,
        history
    };
};
const mapDispatchToProps = (dispatch, {location: {search}}) => {
    const searchObj = qs.parse(search.substring(1)),
        searchedName = searchObj.name;

    const loadMovies = searchedName
        ? page => loadMoviesByName(page, searchedName)
        : loadPopularMovies;

    return {
        ...bindActionCreators({loadMovies, loadGenres}, dispatch)
    };
};

export default compose(
    hot(module),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Movies);
