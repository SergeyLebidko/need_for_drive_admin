import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {ADMIN_APP_URL, POINT_EDIT_APP_URL} from '../../../../../constants/urls';
import './PointCard.scss';

function PointCard({point}) {
    const history = useHistory();
    const toPointEditor = () => history.push(`/${ADMIN_APP_URL}/${POINT_EDIT_APP_URL}/${point.id}`);

    return (
        <li className="point_card">
            <div className="point_card__city_block">
                <span className="point_card__caption_text">Город:</span>
                {point.cityId ?
                    <span className="point_card__value_text">{point.cityId.name}</span>
                    :
                    <span className="point_card__value_text">-</span>
                }
            </div>
            <div className="point_card__address_block">
                <span className="point_card__caption_text">Адрес:</span>
                <span className="point_card__value_text">{point.address}</span>
            </div>
            <div className="point_card__name_block">
                <span className="point_card__caption_text">Название:</span>
                <span className="point_card__value_text">{point.name}</span>
            </div>
            <div className="point_card__control_block">
                <button className="thin_button thin_button_edit" onClick={toPointEditor}>Изменить</button>
            </div>
        </li>
    );
}

PointCard.propTypes = {
    point: PropTypes.object
}

export default PointCard;
