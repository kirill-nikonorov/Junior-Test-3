import React from 'react';
import {compose} from 'redux';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {Bar} from '../../components/index';

import {fromJS} from 'immutable';
import {string, object, bool, func} from 'prop-types';

const loadIfNeeded = props => {
    const {videos, isCurrentPaginationFetching, loadVideos, hasMore} = props;

    const shouldLoadVideos = videos.isEmpty() && hasMore && !isCurrentPaginationFetching;
    if (shouldLoadVideos) {
        loadVideos();
    }
};

class VideosBarContainer extends React.Component {
    static propTypes = {
        isCurrentPaginationFetching: bool.isRequired,
        videos: object.isRequired,
        hasMore: bool.isRequired,
        loadVideos: func.isRequired,
        paginationName: string.isRequired,
        barName: string.isRequired
    };
    renderVideo = video => {
        const id = video.get('id'),
            key = video.get('key');
        return (
            <div key={id}>
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${key}`}
                    frameBorder="0"
                    allow="encrypted-media"
                    allowFullScreen
                />
            </div>
        );
    };

    render() {
        const {videos, barName, hasMore, isCurrentPaginationFetching} = this.props;

        return (
            <div>
                {!videos.isEmpty() && (
                    <Bar
                        barName={barName}
                        items={videos}
                        hasMore={hasMore}
                        isFetching={isCurrentPaginationFetching}
                        renderItem={this.renderVideo}
                    />
                )}
            </div>
        );
    }

    shouldComponentUpdate({isCurrentPaginationFetching, videos, hasMore}) {
        return (
            isCurrentPaginationFetching !== this.props.isCurrentPaginationFetching ||
            !videos.equals(this.props.videos) ||
            hasMore !== this.props.hasMore
        );
    }

    componentWillReceiveProps(nextProps) {
        loadIfNeeded(nextProps);
    }

    componentWillMount() {
        loadIfNeeded(this.props);
    }
}

const mapStateToProps = (state, {id, paginationName, barName = '', loadVideos}) => {
    const pagination = state.get('pagination'),
        paginationPart = pagination.get(paginationName),
        currentPagination = paginationPart.get(id) || fromJS({}),
        isCurrentPaginationFetching = currentPagination.get('isFetching') || false,
        videos = currentPagination.get('results') || fromJS([]),
        hasMore =
            typeof currentPagination.get('hasMore') === 'undefined'
                ? true
                : currentPagination.get('hasMore');

    return {
        barName,
        paginationName,
        isCurrentPaginationFetching,
        videos,
        hasMore,
        loadVideos
    };
};

export default compose(
    hot(module),
    connect(mapStateToProps)
)(VideosBarContainer);
