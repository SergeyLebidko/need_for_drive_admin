import React from 'react';
import {useSelector} from 'react-redux';
import TextField from '../../../../common/TextField/TextField';
import {getCarColors} from '../../../../../store/selectors';
import './CarColors.scss';
import CheckBox from "../../../../common/CheckBox/CheckBox";

function CarColors() {
    const colors = useSelector(getCarColors);

    return (
        <div className="car_colors">
            <div className="car_colors__input_block">
                <TextField label="Доступные цвета"/>
                <button>+</button>
            </div>
            {(colors && colors.length > 0) &&
            <ul className="car_colors__colors_block">
                {colors.map(color => <li key={color}><CheckBox defaultValue={true} caption={color}/></li>)}
            </ul>
            }
        </div>
    );
}

export default CarColors;