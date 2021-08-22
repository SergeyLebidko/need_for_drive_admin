import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {DOMEN} from '../../../urls';
import './OrderCardPhoto.scss';

function OrderCardPhoto({order}) {
    let [hasPhotoError, setHasPhotoError] = useState(false);

    const {carId} = order;
    let photoPath;
    if (carId) {
        photoPath = carId.thumbnail.path;
        photoPath = photoPath[0] === '/' ? `${DOMEN}${photoPath}` : photoPath;
    }

    return (
        <div className="order_card_photo">
            {hasPhotoError ?
                <div className="order_card_photo__error">Не удалось загрузить фото...</div>
                :
                (photoPath ?
                        <img
                            src={photoPath}
                            className="order_card_photo__image"
                            onError={() => setHasPhotoError(true)}
                        />
                        :
                        <div className="order_card_photo__error">Нет фото...</div>
                )
            }
        </div>
    );
}

OrderCardPhoto.propTypes =
    {
        order: PropTypes.object
    }

export default OrderCardPhoto;