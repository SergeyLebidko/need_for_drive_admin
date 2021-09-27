import React from 'react';
import {useSelector} from 'react-redux';
import {getCarCategory, getCarName} from '../../../../../store/selectors';
import './CarInfo.scss';

function CarInfo() {
    const name = useSelector(getCarName);
    const category = useSelector(getCarCategory);

    return (
        <div className="car_info">
            {name && <span className="car_info__name_caption">{name}</span>}
            {category && <span className="car_info__category_caption">{category.name}</span>}
        </div>
    );
}

export default CarInfo;