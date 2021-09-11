import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import Selector from '../../../../common/Selector/Selector';
import {getOrderCity, getOrderPoint, getCatalog} from '../../../../../store/selectors';
import {CITY_LIST_CATALOG, POINT_LIST_CATALOG} from '../../../../../constants/settings';
import {prepareItemForSelector, prepareItemsForSelector} from '../../../../../utils/common_utils';
import {setEntityField} from '../../../../../store/actionCreators';
import './PlaceBlock.scss';

function PlaceBlock({cityErrorText, pointErrorText, resetCityErrorText, resetPointErrorText}) {
    const cityList = useSelector(getCatalog(CITY_LIST_CATALOG));
    const pointList = useSelector(getCatalog(POINT_LIST_CATALOG));

    const [cityListForSelector, setCityListForSelector] = useState([]);
    const selectedCity = useSelector(getOrderCity);

    const [pointListForSelector, setPointListForSelector] = useState([]);
    const selectedPoint = useSelector(getOrderPoint);

    const dispatch = useDispatch();

    useEffect(() => {
        const nextList = [...cityList];
        if (!selectedCity) nextList.unshift(null);
        setCityListForSelector(nextList);
    }, [selectedCity]);

    useEffect(() => {
        // Выстраиваем список пунктов выдачи так, чтобы он был отсортирован по городу.
        // Делаем это здесь так как, к сожалению, API не позволяет проводить сортировку по связанным записям.
        // Также учитываем, что есть пункты выдачи, для которых город не указан. Их ставим в начало списка и сортируем по адресу
        const pointNoCity = pointList.filter(point => !point.cityId);
        const pointWithCity = pointList.filter(point => !!point.cityId);

        const addressComparator = (a, b) => {
            if (a.address.toLowerCase() < b.address.toLowerCase()) return -1;
            if (a.address.toLowerCase() > b.address.toLowerCase()) return 1;
            return 0;
        }

        pointNoCity.sort(addressComparator);

        // В пределах одного города пункты выдачи будут отсортированы лексикографически по адресу
        pointWithCity.sort((a, b) => {
            if (a.cityId.name.toLowerCase() < b.cityId.name.toLowerCase()) return -1;
            if (a.cityId.name.toLowerCase() > b.cityId.name.toLowerCase()) return 1;
            return addressComparator(a, b);
        });

        const nextList = [...pointNoCity, ...pointWithCity];

        if (!selectedPoint) nextList.unshift(null);
        setPointListForSelector(nextList);
    }, [selectedPoint]);

    const pointNameExtractor = point => `(${point.cityId ? point.cityId.name : 'не указан'}) ${point.address}`;

    const extractDataForEntity = value => {
        if ('address' in value) return {id: value.id, name: value.name, address: value.address};
        return {id: value.id, name: value.name};
    }

    const handleCityChange = value => {
        if (value === prepareItemForSelector(selectedCity).value) return;
        const nextSelectedCity = extractDataForEntity(cityList.find(city => city.id === value));
        dispatch(setEntityField('cityId', nextSelectedCity));
        resetCityErrorText();
    }

    const handlePointChange = value => {
        if (value === prepareItemForSelector(selectedPoint).value) return;
        const nextSelectedPoint = extractDataForEntity(pointList.find(point => point.id === value));
        dispatch(setEntityField('pointId', nextSelectedPoint));
        resetPointErrorText();
    }

    return (
        <div className="place_block">
            <Selector
                items={prepareItemsForSelector(cityListForSelector)}
                value={prepareItemForSelector(selectedCity).value}
                handleSelect={handleCityChange}
                label="Город"
                errorText={cityErrorText}
            />
            <Selector
                items={prepareItemsForSelector(pointListForSelector, pointNameExtractor)}
                value={prepareItemForSelector(selectedPoint, pointNameExtractor).value}
                handleSelect={handlePointChange}
                label="Пункт выдачи"
                errorText={pointErrorText}
            />
        </div>
    );
}

PlaceBlock.propTypes = {
    cityErrorText: PropTypes.string,
    pointErrorText: PropTypes.string,
    resetCityErrorText: PropTypes.func,
    resetPointErrorText: PropTypes.func
}

export default PlaceBlock;