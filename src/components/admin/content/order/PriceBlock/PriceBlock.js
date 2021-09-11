import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import TextField from '../../../../common/TextField/TextField';
import {getOrderPrice} from '../../../../../store/selectors';
import {setEntityField} from '../../../../../store/actionCreators';
import './PriceBlock.scss';

function PriceBlock({errorText, resetErrorText}) {
    const price = useSelector(getOrderPrice);
    const dispatch = useDispatch();

    const handlePriceChange = event => {
        const nextPrice = event.target.value;
        dispatch(setEntityField('price', nextPrice));
        resetErrorText();
    };

    return (
        <div className="price_block">
            <TextField label="Цена" value={price} handleChangeValue={handlePriceChange} errorText={errorText}/>
            <span className="price_block__currency">&#8381;</span>
        </div>
    );
}

PriceBlock.propTypes = {
    errorText: PropTypes.string,
    resetErrorText: PropTypes.func
}

export default PriceBlock;