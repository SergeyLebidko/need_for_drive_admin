import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {getFormattedDate, capitalize} from '../../../../utils/common_utils';
import {STATUS_LIST_CATALOG} from '../../../../settings';
import {getCatalog} from '../../../../store/selectors';
import './OrderCardExtra.scss';

function OrderCardExtra({order}) {
    const statusList = useSelector(getCatalog(STATUS_LIST_CATALOG));

    const {id, orderStatusId, carId, cityId, pointId, dateFrom, dateTo, color, rateId} = order;

    const getStatusText = () => orderStatusId ? capitalize(statusList.find(status => orderStatusId.id === status.id).name) : 'не указан';
    const getModelName = () => carId ? carId.name : 'не указана';
    const getCityName = () => cityId ? cityId.name : 'город не указан';
    const getPointAddress = () => pointId ? pointId.address : 'улица не указана';
    const getDateFromString = () => dateFrom ? getFormattedDate(dateFrom) : 'дата начала не указана';
    const getDateToString = () => dateTo ? getFormattedDate(dateTo) : 'дата окончания не указана';
    const getColor = () => color ? capitalize(color) : 'не указан'
    const getRate = () => {
        if (!rateId) return 'не указан';
        const {rateTypeId: {unit, name}, price} = rateId;
        return `${capitalize(name)}. ${price} руб./${unit}`
    }

    return (
        <li className="order_card_extra">
            <div>
                <span className="order_card_extra__normal_text">Заказ №: </span>
                <span className="order_card_extra__strong_text">{id}</span>
            </div>
            <div>
                <span className="order_card_extra__normal_text">Статус заказа: </span>
                <span className="order_card_extra__strong_text">{getStatusText()}</span>
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
                <span className="order_card_extra__normal_text">Срок аренды: </span>
                <span className="order_card_extra__strong_text">{getDateFromString()} - {getDateToString()}</span>
            </div>
            <div>
                <span className="order_card_extra__normal_text">Цвет: </span>
                <span className="order_card_extra__strong_text">{getColor()}</span>
            </div>
            <div>
                <span className="order_card_extra__normal_text">Выбранный тариф: </span>
                <span className="order_card_extra__strong_text">{getRate()}</span>
            </div>
        </li>
    );
}

OrderCardExtra.propTypes =
    {
        order: PropTypes.object
    }

export default OrderCardExtra;