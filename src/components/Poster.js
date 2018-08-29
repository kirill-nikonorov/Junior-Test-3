import React from 'react';
import {IMAGE_URL} from '../constants/apiConstants';
import {hot} from 'react-hot-loader';
import {string, func, any} from 'prop-types';

const Poster = ({posterPath, size, title, onClick}) => {
    const isSizeNumber = typeof +size === 'number';
    const posterSize = isSizeNumber ? `w${size}` : size;
    const imgHeight = isSizeNumber && size;
    const imgWidth = imgHeight && imgHeight / 1.5;

    return (
        <img
            onClick={onClick}
            src={`${IMAGE_URL}/${posterSize}${posterPath}`}
            alt={`${title}`}
            height={imgHeight + 'px'}
            width={imgWidth + 'px'}
        />
    );
};

Poster.propTypes = {
    posterPath: string.isRequired,
    size: any.isRequired,
    title: string,
    onClick: func
};

export default hot(module)(Poster);
