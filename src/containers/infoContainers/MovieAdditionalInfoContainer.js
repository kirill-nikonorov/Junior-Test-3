import React from 'react';
import {compose} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';

import MoviesBarContainer from '../barContainers/MoviesBarContainer';
import VideoBarContainer from '../barContainers/VideosBarContainer';
import {
    loadMovieVideos,
    loadRecommendationsByMovieId,
    loadSimilarMoviesByMovieId
} from '../../actions/index';
import {RECOMMENDATIONS, SIMILAR_MOVIES, VIDEOS} from '../../constants/paginationConstants';
import {string, object, func} from 'prop-types';

class MovieAdditionalInfo extends React.Component {
    static propTypes = {
        id: string.isRequired,
        history: object.isRequired,
        loadMovieVideos: func.isRequired,
        loadRecommendationsByMovieId: func.isRequired,
        loadSimilarMoviesByMovieId: func.isRequired
    };

    render() {
        const {
            history,
            id,
            loadRecommendationsByMovieId,
            loadSimilarMoviesByMovieId,
            loadMovieVideos
        } = this.props;

        return (
            <div>
                <VideoBarContainer
                    id={id}
                    barName="Трейлеры"
                    paginationName={VIDEOS}
                    loadVideos={() => loadMovieVideos(id)}
                />
                <MoviesBarContainer
                    id={id}
                    barName="Рекомендации"
                    paginationName={RECOMMENDATIONS}
                    loadMovies={page => loadRecommendationsByMovieId(id, page)}
                    history={history}
                />
                <MoviesBarContainer
                    id={id}
                    barName="Похожие"
                    paginationName={SIMILAR_MOVIES}
                    loadMovies={page => loadSimilarMoviesByMovieId(id, page)}
                    history={history}
                />
            </div>
        );
    }

    shouldComponentUpdate({id}) {
        return id !== this.props.id;
    }
}

const mapStateToProps = (state, {id, history}) => {
    return {
        history,
        id
    };
};

export default compose(
    hot(module),
    connect(
        mapStateToProps,
        {loadMovieVideos, loadRecommendationsByMovieId, loadSimilarMoviesByMovieId}
    )
)(MovieAdditionalInfo);
