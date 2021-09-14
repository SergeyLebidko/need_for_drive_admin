import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '../../../../common/TextField/TextField';
import {getCarName} from '../../../../../store/selectors';
import {setEntityField} from '../../../../../store/actionCreators';
import './CarName.scss';

function CarName({errorText, resetErrorText}) {
    const dispatch = useDispatch();
    const name = useSelector(getCarName);

    const handleNameChange = event => {
        const nextName = event.target.value;

        // Сразу же отсекаем попытки ввести имя модели, состоящее из одних пробелов
        if (!nextName.trim() && nextName.length > 0) return;

        dispatch(setEntityField('name', nextName));
        resetErrorText();
    };

    return (
        <div className="car_name">
            <TextField
                label="Модель автомобиля"
                value={name}
                handleChangeValue={handleNameChange}
                errorText={errorText}
            />
        </div>
    );
}

CarName.propTypes = {
    errorText: PropTypes.string,
    resetErrorText: PropTypes.func
}

export default CarName;