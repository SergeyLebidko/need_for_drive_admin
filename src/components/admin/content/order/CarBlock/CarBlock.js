import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Selector from '../../../../common/Selector/Selector';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import CatalogSelector from '../../../../common/CatalogSelector/CatalogSelector';
import {getOrderCar, getOrderColor} from '../../../../../store/selectors';
import {setEntityField} from '../../../../../store/actionCreators';
import {CAR_LIST_CATALOG, NO_FILTER_VALUE} from '../../../../../constants/settings';
import './CarBlock.scss';

function CarBlock() {
    const [colorListForSelector, setColorListForSelector] = useState([]);
    const selectedColor = useSelector(getOrderColor);
    const selectedCar = useSelector(getOrderCar);

    const dispatch = useDispatch();

    const hasFirstEffect = useRef(true);

    const prepareColorForSelector = color => {
        if (!color) return {value: NO_FILTER_VALUE, name: 'Любой цвет'};
        return {value: color, name: color};
    };

    const prepareColorsForSelector = colors => colors.map(color => prepareColorForSelector(color));

    const carIdForEffect = selectedCar ? selectedCar.id : '';

    // При выборе нового автомобиля сбрасываем выбранный цвет.
    // При этом отбрасываем первый запуск хука, чтобы не сбросить цвет сразу же при монтировании.
    useEffect(() => {
        if (hasFirstEffect.current) {
            hasFirstEffect.current = false;
            return;
        }
        dispatch(setEntityField('color', null));
    }, [carIdForEffect]);

    useEffect(() => {
        const colorsSet = new Set();
        if (selectedCar && selectedCar.colors) {
            for (const color of selectedCar.colors) colorsSet.add(color);
        }
        if (selectedColor) colorsSet.add(selectedColor);
        colorsSet.add(null);
        setColorListForSelector(Array.from(colorsSet).sort());
    }, [selectedColor, selectedCar]);

    const handleColorChange = value => {
        if (value === NO_FILTER_VALUE) {
            dispatch(setEntityField('color', null));
            return;
        }
        dispatch(setEntityField('color', value));
    }

    return (
        <div className="car_block">
            <div className="car_block__selectors">
                <CatalogSelector
                    label="Автомобиль"
                    catalogName={CAR_LIST_CATALOG}
                    entityField="carId"
                    fieldGetter={getOrderCar}
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