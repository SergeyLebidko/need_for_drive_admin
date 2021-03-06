import React, {useEffect, useState} from 'react';
import Selector from '../../../../common/Selector/Selector';
import {useSelector} from 'react-redux';
import {getCatalog} from '../../../../../store/selectors';
import {useHistory, useLocation} from 'react-router-dom';
import {
    CITY_FILTER_NAME,
    CITY_LIST_CATALOG,
    NO_FILTER_VALUE,
    PAGE_FILTER_NAME
} from '../../../../../constants/settings';
import FilterControlBlock from '../../../../common/FilterControlBlock/FilterControlBlock';
import {createSearchString, extractSearchParams} from '../../../../../utils/common_utils';
import {ADMIN_APP_URL, POINT_LIST_APP_URL} from '../../../../../constants/urls';
import './PointFilters.scss';

function PointFilters() {
    const [selectedCity, setSelectedCity] = useState(NO_FILTER_VALUE);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const [city] = extractSearchParams(location, [CITY_FILTER_NAME]);
        setSelectedCity(city || NO_FILTER_VALUE);
    }, [location]);

    const cityList = useSelector(getCatalog(CITY_LIST_CATALOG));
    const citySelectorItems = [{value: NO_FILTER_VALUE, name: 'Любой город'}];
    for (const city of cityList) citySelectorItems.push({value: city.id, name: city.name});

    const handleCitySelect = value => setSelectedCity(value);

    const handleApplyClick = () => {
        const params = createSearchString({
            [PAGE_FILTER_NAME]: '0',
            [CITY_FILTER_NAME]: selectedCity
        });
        history.push(`/${ADMIN_APP_URL}/${POINT_LIST_APP_URL}?${params}`);
    }

    const handleResetClick = () => {
        setSelectedCity(NO_FILTER_VALUE);
        history.push(`/${ADMIN_APP_URL}/${POINT_LIST_APP_URL}?${PAGE_FILTER_NAME}=0`);
    }

    return (
        <div className="point_filters">
            <Selector items={citySelectorItems} value={selectedCity} handleSelect={handleCitySelect}/>
            <FilterControlBlock handleApply={handleApplyClick} handleReset={handleResetClick}/>
        </div>
    );
}

export default PointFilters;