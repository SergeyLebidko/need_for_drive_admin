import React from 'react';
import PropTypes from 'prop-types';
import './OrderCardOptions.scss';

function OrderCardOptions({order}){
    const {isFullTank, isNeedChildChair, isRightWheel} = order;

    return (
        <div className="order_card_options">
            {isFullTank ? 'полный бак' : 'не выбран полный бак'}
            {isNeedChildChair ? 'детское кресло' : 'не выбрано детское кресло'}
            {isRightWheel ? 'правый руль' : 'не выбран правый руль'}
        </div>
    );
}

OrderCardOptions.propTypes = {
    order: PropTypes.object
}

export default OrderCardOptions;