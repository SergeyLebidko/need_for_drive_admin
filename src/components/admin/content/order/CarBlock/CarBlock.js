import React from 'react';
import Selector from '../../../../common/Selector/Selector';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import './CarBlock.scss';

function CarBlock() {
    return (
        <div className="car_block">
            <div className="car_block__selectors">
                <Selector label="Автомобиль"/>
                <Selector label="Цвет"/>
            </div>
            <PhotoBlock/>
        </div>
    );
}

export default CarBlock;