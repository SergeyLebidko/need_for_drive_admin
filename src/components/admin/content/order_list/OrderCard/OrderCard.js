import React from 'react';
import PropTypes from 'prop-types';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import OrderCardExtra from '../OrderCardExtra/OrderCardExtra';
import OrderCardOptions from '../OrderCardOptions/OrderCardOptions';
import OrderCardPrice from '../OrderCardPrice/OrderCardPrice';
import ListElementControl from '../../../../common/ListElementControl/ListElementControl';
import './OrderCard.scss';

function OrderCard({order}) {
    return (
        <li className="order_card">
            <div className="order_card__first_block">
                <PhotoBlock photoPath={order.carId ? order.carId.thumbnail.path : null}/>
                <OrderCardExtra order={order}/>
            </div>
            <div className="order_card__second_block">
                <OrderCardOptions order={order}/>
                <OrderCardPrice order={order}/>
                <ListElementControl/>
            </div>
        </li>
    );
}

OrderCard.propTypes = {
    order: PropTypes.object
}

export default OrderCard;