import React from 'react';
import {compose} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';

import MoviesBarContainer from '../barContainers/MoviesBarContainer';
import VideoBarContainer from '../barContainers/VideosBarContainer';
import {
    loadVideos,
    loadRecommendationsByMovieId,
    loadSimilarMoviesByMovieId
} from '../../actions/index';
import {RECOMMENDATIONS, SIMILAR_MOVIES, VIDEOS} from '../../constants/paginationConstants';
import {string, object, func} from 'prop-types';

class MovieAdditionalInfo extends React.Component {
    static propTypes = {
        id: string.isRequired,
        history: object.isRequired,
        loadVideos: func.isRequired,
        loadRecommendationsByMovieId: func.isRequired,
        loadSimilarMoviesByMovieId: func.isRequired
    };

    render() {
        const {
            history,
            id,
            loadRecommendationsByMovieId,
            loadSimilarMoviesByMovieId,
            loadVideos
        } = this.props;

        return (
            <div>
                <VideoBarContainer
                    id={id}
                    barName="Трейлеры"
                    paginationName={VIDEOS}
                    loadMore={loadVideos}
                />
                <MoviesBarContainer
                    id={id}
                    barName="Рекомендации"
                    paginationName={RECOMMENDATIONS}
                    loadMore={loadRecommendationsByMovieId}
                    history={history}
                />
                <MoviesBarContainer
                    id={id}
                    barName="Похожие"
                    paginationName={SIMILAR_MOVIES}
                    loadMore={loadSimilarMoviesByMovieId}
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
        {loadVideos, loadRecommendationsByMovieId, loadSimilarMoviesByMovieId}
    )
)(MovieAdditionalInfo);
