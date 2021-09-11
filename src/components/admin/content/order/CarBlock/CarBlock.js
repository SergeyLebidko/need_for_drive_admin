import React from 'react';
import {useSelector} from 'react-redux';
import Selector from '../../../../common/Selector/Selector';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import {getOrderCar} from '../../../../../store/selectors';
import './CarBlock.scss';


function CarBlock() {
    const car = useSelector(getOrderCar);

    return (
        <div className="car_block">
            <div className="car_block__selectors">
                <Selector label="Автомобиль"/>
                <Selector label="Цвет"/>
            </div>
            <PhotoBlock photoPath={!!car && car.thumbnail.path}/>
        </div>
    );
}

export default CarBlock;