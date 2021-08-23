import React from 'react';
import PropTypes from 'prop-types';
import OrderCardPhoto from '../OrderCardPhoto/OrderCardPhoto';
import OrderCardExtra from '../OrderCardExtra/OrderCardExtra';
import OrderCardOptions from '../OrderCardOptions/OrderCardOptions';
import OrderCardPrice from '../OrderCardPrice/OrderCardPrice';
import OrderControlBlock from '../OrderControlBlock/OrderControlBlock';
import './OrderCard.scss';

function OrderCard({order}) {
    return (
        <li className="order_card">
            <OrderCardPhoto order={order}/>
            <OrderCardExtra order={order}/>
            <OrderCardOptions order={order}/>
            <OrderCardPrice order={order}/>
            <OrderControlBlock/>
        </li>
    );
}

OrderCard.propTypes = {
    order: PropTypes.object
}

export default OrderCard;