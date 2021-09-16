import React from 'react';
import TextField from '../../../../common/TextField/TextField';
import './CarColors.scss';

function CarColors(){
    return (
        <div className="car_colors">
            <TextField/>
            <button>+</button>
            <ul>

            </ul>
        </div>
    );
}

export default CarColors;