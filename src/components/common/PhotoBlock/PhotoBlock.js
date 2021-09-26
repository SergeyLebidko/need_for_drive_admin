import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {DOMEN} from '../../../constants/urls';
import './PhotoBlock.scss';

function PhotoBlock({photoPath}) {
    const [path, setPath] = useState(photoPath);

    useEffect(() => setPath(photoPath), [photoPath]);

    const clearPath = () => setPath(null);

    if (path) return (
        <div className="photo_block">
            <img
                src={path[0] === '/' ? `${DOMEN}${path}` : path}
                className="photo_block__image"
                onError={clearPath}
            />
        </div>
    );

    return (
        <div className="photo_block">
            <div className="photo_block__error">Нет фото...</div>
        </div>
    );
}

PhotoBlock.propTypes = {
    photoPath: PropTypes.string
}

export default PhotoBlock;