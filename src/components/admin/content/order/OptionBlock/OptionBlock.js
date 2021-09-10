import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CheckBox from '../../../../common/CheckBox/CheckBox';
import {getOrderChair, getOrderTank, getOrderWheel} from '../../../../../store/selectors';
import './OptionBlock.scss';
import {setEntityField} from "../../../../../store/actionCreators";

function OptionBlock() {
    const tank = useSelector(getOrderTank);
    const chair = useSelector(getOrderChair);
    const wheel = useSelector(getOrderWheel);

    const dispatch = useDispatch();

    const handleTankChange = () => dispatch(setEntityField('isFullTank', !tank));
    const handleChairChange = () => dispatch(setEntityField('isNeedChildChair', !chair));
    const handleWheelChange = () => dispatch(setEntityField('isRightWheel', !wheel));

    return (
        <div className="option_block">
            <CheckBox defaultValue={!!tank} handleChange={handleTankChange} caption="Полный бак"/>
            <CheckBox defaultValue={!!chair} handleChange={handleChairChange} caption="Детское кресло"/>
            <CheckBox defaultValue={!!wheel} handleChange={handleWheelChange} caption="Правый руль"/>
        </div>
    );
}

export default OptionBlock;