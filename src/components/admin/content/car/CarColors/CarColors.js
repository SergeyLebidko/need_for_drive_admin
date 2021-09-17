import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import CheckBox from '../../../../common/CheckBox/CheckBox';
import TextField from '../../../../common/TextField/TextField';
import {setEntityField} from '../../../../../store/actionCreators';
import {getCarColors} from '../../../../../store/selectors';
import './CarColors.scss';

function CarColors({errorText, resetErrorText}) {
    const dispatch = useDispatch();

    const entityColors = useSelector(getCarColors);

    const [colorsForSelect, setColorsForSelect] = useState([]);
    const [colorsFlag, setColorsFlag] = useState([]);

    const [colorInputValue, setColorInputValue] = useState('');

    useEffect(() => {
        if (entityColors && entityColors.length > 0) {
            setColorsForSelect([...entityColors]);
            setColorsFlag(Array(entityColors.length).fill(true));
        }
    }, []);

    useEffect(() => {
        dispatch(setEntityField('colors', colorsForSelect.filter((_, index) => colorsFlag[index])));
        resetErrorText();
    }, [colorsForSelect, colorsFlag])

    const handleColorInputChange = event => {
        const nextValue = event.target.value;
        if (nextValue.trim() === '' && nextValue.length > 0) return;
        setColorInputValue(nextValue)
    }

    const handleAppendColor = () => {
        if (!colorInputValue) return;

        // Не даем пользователю добавить в список цветов дубликат
        if (colorsForSelect.find(color => color.toLowerCase() === colorInputValue.toLowerCase())) return;

        setColorsForSelect([colorInputValue, ...colorsForSelect]);
        setColorsFlag([true, ...colorsFlag]);
    }

    const handleCheckBoxChange = index => {
        setColorsFlag(oldFlags => oldFlags.map((flag, flagIndex) => flagIndex === index ? !flag : flag));
    }

    return (
        <div className="car_colors">
            <div className="car_colors__input_block">
                <TextField
                    label="Доступные цвета"
                    value={colorInputValue}
                    handleChangeValue={handleColorInputChange}
                    errorText={errorText}
                />
                <button onClick={handleAppendColor}>+</button>
            </div>
            {colorsForSelect.length > 0 &&
            <ul className="car_colors__colors_block">
                {colorsForSelect.map(
                    (color, index) => (
                        <li key={color}>
                            <CheckBox
                                defaultValue={colorsFlag[index]}
                                handleChange={() => handleCheckBoxChange(index)}
                                caption={color}
                            />
                        </li>
                    )
                )}
            </ul>
            }
        </div>
    );
}

CarColors.propTypes = {
    errorText: PropTypes.string,
    resetErrorText: PropTypes.func
}

export default CarColors;