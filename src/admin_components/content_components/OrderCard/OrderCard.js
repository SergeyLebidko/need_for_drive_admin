import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {DOMEN} from '../../../urls';
import './OrderCard.scss';

function OrderCard({order}) {
    let [hasPhotoError, setHasPhotoError] = useState(false);

    // Извлекаем сведения об автомобиле. При этом учитываем, что они могут отсутствовать
    const {carId} = order;
    let path;
    if (carId) {
        path = carId.thumbnail.path;
        path = path[0] === '/' ? `${DOMEN}${path}` : path;
    }

    return (
        <li className="order_card">
            {hasPhotoError ?
                <div className="order_card__no_photo">Не удалось загрузить фото...</div>
                :
                (path ?
                        <img src={path} className="order_card__photo" onError={() => setHasPhotoError(true)}/>
                        :
                        <div className="order_card__no_photo">Нет фото...</div>
                )
            }
            {order.id}
        </li>
    );
}

OrderCard.propTypes = {
    order: PropTypes.object
}

export default OrderCard;