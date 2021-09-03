import React, {useState} from 'react';
import './PointFilters.scss';
import Selector from '../../../../common/Selector/Selector';
import {useSelector} from 'react-redux';
import {getCatalog} from '../../../../../store/selectors';
import {CITY_LIST_CATALOG, NO_FILTER_VALUE} from '../../../../../constants/settings';

function PointFilters() {
    const [selectedCity, setSelectedCity] = useState(NO_FILTER_VALUE);

    const cityList = useSelector(getCatalog(CITY_LIST_CATALOG));
    const citySelectorItems = [{value: NO_FILTER_VALUE, name: 'Любой город'}];
    for (const city of cityList) citySelectorItems.push({value: city.id, name: city.name});

    const handleCitySelect = value => setSelectedCity(value);

    return (
        <div className="point_filters">
            <Selector items={citySelectorItems} value={selectedCity} handleSelect={handleCitySelect}/>
            <button className="button button_red point_filters__reset_button">Сброс</button>
            <button className="button button_blue point_filters__apply_button">Применить</button>
        </div>
    );
}

export default PointFilters;