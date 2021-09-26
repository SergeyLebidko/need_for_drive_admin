import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import Selector from '../../../../common/Selector/Selector';
import FilterControlBlock from '../../../../common/FilterControlBlock/FilterControlBlock';
import {
    NO_FILTER_VALUE,
    PER_DAY,
    PER_WEEK,
    PER_MONTH,
    BEGIN_DAY,
    BEGIN_MONTH,
    BEGIN_WEEK,
    CAR_LIST_CATALOG,
    CITY_LIST_CATALOG,
    STATUS_LIST_CATALOG,
    DATE_FROM_FILTER_NAME,
    CAR_FILTER_NAME,
    CITY_FILTER_NAME,
    STATUS_FILTER_NAME,
    PAGE_FILTER_NAME
} from '../../../../../constants/settings';
import {
    ADMIN_APP_URL,
    ORDER_LIST_APP_URL
} from '../../../../../constants/urls';
import {getCatalog} from '../../../../../store/selectors';
import './OrderFilters.scss';
import {extractSearchParams} from "../../../../../utils/common_utils";

function OrderFilters() {
    const location = useLocation();
    const history = useHistory();

    const [selectedDate, setSelectedDate] = useState(NO_FILTER_VALUE);
    const [selectedCar, setSelectedCar] = useState(NO_FILTER_VALUE);
    const [selectedCity, setSelectedCity] = useState(NO_FILTER_VALUE);
    const [selectedStatus, setSelectedStatus] = useState(NO_FILTER_VALUE);

    const carList = useSelector(getCatalog(CAR_LIST_CATALOG));
    const cityList = useSelector(getCatalog(CITY_LIST_CATALOG));
    const statusList = useSelector(getCatalog(STATUS_LIST_CATALOG));

    // При монтировании учитываем, что при вводе в адресную строку готового URL в нём уже могут быть фильтры, которые надо учесть
    useEffect(() => {
        const paramNames = [DATE_FROM_FILTER_NAME, CAR_FILTER_NAME, CITY_FILTER_NAME, STATUS_FILTER_NAME];
        const [date, car, city, status] = extractSearchParams(location, paramNames);

        setSelectedDate(date || NO_FILTER_VALUE);
        setSelectedCar(car || NO_FILTER_VALUE);
        setSelectedCity(city || NO_FILTER_VALUE);
        setSelectedStatus(status || NO_FILTER_VALUE);
    }, [location]);

    // Готовим данные для селектора времени
    const dateSelectorItems = [
        {name: 'За все время', value: NO_FILTER_VALUE},
        {name: 'С начала текущего дня', value: BEGIN_DAY},
        {name: 'За прошедшие сутки', value: PER_DAY},
        {name: 'С начала текущей недели', value: BEGIN_WEEK},
        {name: 'За прошедшую неделю (7 суток)', value: PER_WEEK},
        {name: 'С начала текущего месяца', value: BEGIN_MONTH},
        {name: 'За прошедший месяц (30 суток)', value: PER_MONTH},
    ];

    const handleDateSelect = value => setSelectedDate(value);

    // Готовим данные для селектора моделей авто
    const carSelectorItems = [{name: 'Все модели', value: NO_FILTER_VALUE}];
    for (const {id, name} of carList) carSelectorItems.push({name, value: id});

    const handleCarSelect = value => setSelectedCar(value);

    // Готовим данные для селектора городов
    const citySelectorItems = [{name: 'Любой город', value: NO_FILTER_VALUE}];
    for (const {id, name} of cityList) citySelectorItems.push({name, value: id});

    const handleCitySelect = value => setSelectedCity(value);

    // Готовим данные для селектора по статусам заказов
    const statusSelectorItems = [{name: 'Любой статус', value: NO_FILTER_VALUE}];
    for (const {id, name} of statusList) statusSelectorItems.push({name, value: id});

    const handleStatusSelect = value => setSelectedStatus(value);

    // Обработчик применения фильтров
    const handleApplyFilters = () => {
        const params = new URLSearchParams(location.search);

        // При изменении любого фильтра - начинаем с первой страницы
        params.set(PAGE_FILTER_NAME, '0');

        if (selectedDate === NO_FILTER_VALUE) {
            params.delete(DATE_FROM_FILTER_NAME);
        } else {
            params.set(DATE_FROM_FILTER_NAME, selectedDate);
        }
        if (selectedCar === NO_FILTER_VALUE) {
            params.delete(CAR_FILTER_NAME);
        } else {
            params.set(CAR_FILTER_NAME, selectedCar);
        }
        if (selectedCity === NO_FILTER_VALUE) {
            params.delete(CITY_FILTER_NAME);
        } else {
            params.set(CITY_FILTER_NAME, selectedCity);
        }
        if (selectedStatus === NO_FILTER_VALUE) {
            params.delete(STATUS_FILTER_NAME);
        } else {
            params.set(STATUS_FILTER_NAME, selectedStatus);
        }

        history.push(`/${ADMIN_APP_URL}/${ORDER_LIST_APP_URL}/?${params}`);
    }

    // Обработчик сброса фильтров
    const handleResetFilters = () => {
        setSelectedDate(NO_FILTER_VALUE);
        setSelectedCar(NO_FILTER_VALUE);
        setSelectedCity(NO_FILTER_VALUE);
        setSelectedStatus(NO_FILTER_VALUE);
        history.push(`/${ADMIN_APP_URL}/${ORDER_LIST_APP_URL}/?${PAGE_FILTER_NAME}=0`);
    }

    return (
        <div className="order_filters">
            <div className="order_filters__selectors_block">
                <Selector items={dateSelectorItems} handleSelect={handleDateSelect} value={selectedDate}/>
                <Selector items={carSelectorItems} handleSelect={handleCarSelect} value={selectedCar}/>
                <Selector items={citySelectorItems} handleSelect={handleCitySelect} value={selectedCity}/>
                <Selector items={statusSelectorItems} handleSelect={handleStatusSelect} value={selectedStatus}/>
            </div>
            <FilterControlBlock handleApply={handleApplyFilters} handleReset={handleResetFilters}/>
        </div>
    );
}

export default OrderFilters;