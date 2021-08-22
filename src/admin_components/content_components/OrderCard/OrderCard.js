import React from 'react';
import PropTypes from 'prop-types';
import OrderCardPhoto from '../OrderCardPhoto/OrderCardPhoto';
import './OrderCard.scss';

function OrderCard({order}) {

    return (
        <li className="order_card">
            <OrderCardPhoto order={order}/>
        </li>
    );
}

OrderCard.propTypes = {
    order: PropTypes.object
}

export default OrderCard;