import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Selector from '../../../../common/Selector/Selector';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import {getCatalog, getOrderCar, getOrderColor} from '../../../../../store/selectors';
import {prepareItemForSelector, prepareItemsForSelector} from '../../../../../utils/common_utils';
import {setEntityField} from '../../../../../store/actionCreators';
import {CAR_LIST_CATALOG, NO_FILTER_VALUE} from '../../../../../constants/settings';
import './CarBlock.scss';

function CarBlock() {
    const carList = useSelector(getCatalog(CAR_LIST_CATALOG));

    const [carListForSelector, setCarListForSelector] = useState([]);
    const selectedCar = useSelector(getOrderCar);

    const [colorListForSelector, setColorListForSelector] = useState([]);
    const selectedColor = useSelector(getOrderColor);

    const dispatch = useDispatch();

    const prepareColorForSelector = color => {
        if (!color) return {value: NO_FILTER_VALUE, name: 'Любой цвет'};
        return {value: color, name: color};
    };

    const prepareColorsForSelector = colors => colors.map(color => prepareColorForSelector(color));

    useEffect(() => {
        const nextList = [...carList];
        if (!selectedCar) nextList.unshift(null);
        setCarListForSelector(nextList)
    }, [selectedCar]);

    useEffect(() => {
        let nextList = [null];
        if (selectedCar && selectedCar.colors) {
            if (selectedColor && !selectedCar.colors.includes(selectedColor)) nextList.push(selectedColor);
            nextList = nextList.concat(selectedCar.colors);
        }
        setColorListForSelector(nextList);
    }, [selectedColor, selectedCar]);

    const handleCarChange = value => {
        if (value === prepareItemForSelector(selectedCar).value) return;
        dispatch(setEntityField('carId', carList.find(car => car.id === value)));

        // При выборе другого авто - сбрасываем также и выбранный ранее цвет
        dispatch(setEntityField('color', null));
    }

    const handleColorChange = value => {
        if (value === prepareColorForSelector(selectedColor).value) return;
        if (value === NO_FILTER_VALUE) {
            dispatch(setEntityField('color', null));
            return;
        }
        dispatch(setEntityField('color', value));
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
                <Selector
                    label="Цвет"
                    items={prepareColorsForSelector(colorListForSelector)}
                    value={prepareColorForSelector(selectedColor).value}
                    handleSelect={handleColorChange}
                />
            </div>
            <PhotoBlock photoPath={selectedCar ? selectedCar.thumbnail.path : null}/>
        </div>
    );
}

export default CarBlock;