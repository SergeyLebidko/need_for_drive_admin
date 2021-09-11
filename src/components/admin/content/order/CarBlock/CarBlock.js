import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Selector from '../../../../common/Selector/Selector';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import {getCatalog, getOrderCar} from '../../../../../store/selectors';
import {prepareItemForSelector, prepareItemsForSelector} from '../../../../../utils/common_utils';
import {setEntityField} from '../../../../../store/actionCreators';
import {CAR_LIST_CATALOG} from '../../../../../constants/settings';
import './CarBlock.scss';

function CarBlock() {
    const carList = useSelector(getCatalog(CAR_LIST_CATALOG));

    const [carListForSelector, setCarListForSelector] = useState([]);
    const selectedCar = useSelector(getOrderCar);

    const dispatch = useDispatch();

    useEffect(() => {
        const nextList = [...carList];
        if (!selectedCar) nextList.unshift(null);
        setCarListForSelector(nextList)
    }, [selectedCar]);

    const handleCarChange = value => {
        if (value === prepareItemForSelector(selectedCar).value) return;
        dispatch(setEntityField('carId', carList.find(car => car.id === value)));
    }

    return (
        <div className="car_block">
            <div className="car_block__selectors">
                <Selector
                    label="Автомобиль"
                    items={prepareItemsForSelector(carListForSelector)}
                    value={prepareItemForSelector(selectedCar).value}
                    handleSelect={handleCarChange}
                />
                <Selector label="Цвет"/>
            </div>
            <PhotoBlock photoPath={selectedCar ? selectedCar.thumbnail.path : null}/>
        </div>
    );
}

export default CarBlock;