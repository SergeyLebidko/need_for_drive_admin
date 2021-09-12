import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import OrderCardExtra from '../OrderCardExtra/OrderCardExtra';
import OrderCardOptions from '../OrderCardOptions/OrderCardOptions';
import OrderCardPrice from '../OrderCardPrice/OrderCardPrice';
import ListElementControl from '../../../../common/ListElementControl/ListElementControl';
import {ADMIN_APP_URL, ORDER_EDIT_APP_URL} from '../../../../../constants/urls';
import './OrderCard.scss';

function OrderCard({order}) {
    const history = useHistory();
    const toOrderEditor = () => history.push(`/${ADMIN_APP_URL}/${ORDER_EDIT_APP_URL}/${order.id}`);

    return (
        <li className="order_card">
            <div className="order_card__first_block">
                <PhotoBlock photoPath={order.carId ? order.carId.thumbnail.path : null}/>
                <OrderCardExtra order={order}/>
            </div>
            <div className="order_card__second_block">
                <OrderCardOptions order={order}/>
                <OrderCardPrice order={order}/>
                <ListElementControl handleButtonClick={toOrderEditor}/>
            </div>
        </li>
    );
}

OrderCard.propTypes = {
    order: PropTypes.object
}

export default OrderCard;