import React from 'react';
import PropTypes from 'prop-types';
import {getFormattedPrice} from '../../../../../utils/common_utils';
import './OrderCardPrice.scss';

function OrderCardPrice({order}) {
    const {price} = order;

    return (
        <div className="order_card_price">
            {price ?
                <h1 className="order_card_price__price">{getFormattedPrice(price)} &#8381;</h1>
                :
                <h1 className="order_card_price__empty_price">цена на указана</h1>
            }
        </div>
    );
}

OrderCardPrice.propTypes = {
    order: PropTypes.object
}

export default OrderCardPrice;