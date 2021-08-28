import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {DOMEN} from '../../../../../constants/urls';
import './OrderCardPhoto.scss';

function OrderCardPhoto({order}) {
    const [path, setPath] = useState(null);

    useEffect(() => {
        const {carId} = order;
        let photoPath;
        if (carId) {
            photoPath = carId.thumbnail.path;
            photoPath = photoPath[0] === '/' ? `${DOMEN}${photoPath}` : photoPath;
            setPath(photoPath);
        }
    }, []);


    if (path) return (
        <div className="order_card_photo">
            <img
                src={path}
                className="order_card_photo__image"
                onError={() => setPath(null)}
            />
        </div>
    );

    return (
        <div className="order_card_photo ">
            <div className="order_card_photo__error">Нет фото...</div>
        </div>
    );
}

OrderCardPhoto.propTypes = {
    order: PropTypes.object
}

export default OrderCardPhoto;