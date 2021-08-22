import React from 'react';
import PropTypes from 'prop-types';
import {getFormattedDate, capitalize} from '../../../utils/common_utils';
import './OrderCardExtra.scss';

function OrderCardExtra({order}) {
    const {id, carId, cityId, pointId, dateFrom, dateTo, color} = order;

    const getModelName = () => carId ? carId.name : 'не указана';
    const getCityName = () => cityId ? cityId.name : 'город не указан';
    const getPointAddress = () => pointId ? pointId.address : 'улица не указана';
    const getDateFromString = () => dateFrom ? getFormattedDate(dateFrom) : 'дата начала не указана';
    const getDateToString = () => dateTo ? getFormattedDate(dateTo) : 'дата окончания не указана';
    const getColor = () => color ? capitalize(color) : 'не указан'

    return (
        <li className="order_card_extra">
            <div>
                <span className="order_card_extra__normal_text">Заказ №: </span>
                <span className="order_card_extra__strong_text">{id}</span>
            </div>
            <div>
                <span className="order_card_extra__normal_text">Модель: </span>
                <span className="order_card_extra__strong_text">{getModelName()}</span>
            </div>
            <div>
                <span className="order_card_extra__normal_text">Адрес: </span>
                <span className="order_card_extra__strong_text">{getCityName()}, </span>
                <span className="order_card_extra__strong_text">{getPointAddress()}</span>
            </div>
            <div>
                <span className="order_card_extra__normal_text">{getDateFromString()} - {getDateToString()}</span>
            </div>
            <div>
                <span className="order_card_extra__normal_text">Цвет: </span>
                <span className="order_card_extra__strong_text">{getColor()}</span>
            </div>
        </li>
    );
}

OrderCardExtra.propTypes =
    {
        order: PropTypes.object
    }

export default OrderCardExtra;