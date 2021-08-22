import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../../../common_components/CheckBox/CheckBox';
import './OrderCardOptions.scss';

function OrderCardOptions({order}) {
    const {isFullTank, isNeedChildChair, isRightWheel} = order;

    return (
        <div className="order_card_options">
            <CheckBox caption="Полный бак" defaultValue={!!isFullTank} disabled/>
            <CheckBox caption="Детское кресло" defaultValue={!!isNeedChildChair} disabled/>
            <CheckBox caption="Правый руль" defaultValue={!!isRightWheel} disabled/>
        </div>
    );
}

OrderCardOptions.propTypes = {
    order: PropTypes.object
}

export default OrderCardOptions;