import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import Selector from '../../../../common_components/Selector/Selector';
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
    DATE_FILTER_NAME,
    CAR_FILTER_NAME,
    CITY_FILTER_NAME,
    STATUS_FILTER_NAME
} from '../../../../settings';
import {
    ADMIN_APP_URL, ORDER_LIST_APP_URL
} from '../../../../urls';
import {getCatalog} from '../../../../store/selectors';
import './OrderFilters.scss';

function OrderFilters() {
    let [selectedDate, setSelectedDate] = useState(NO_FILTER_VALUE);
    let [selectedCar, setSelectedCar] = useState(NO_FILTER_VALUE);
    let [selectedCity, setSelectedCity] = useState(NO_FILTER_VALUE);
    let [selectedStatus, setSelectedStatus] = useState(NO_FILTER_VALUE);

    const carList = useSelector(getCatalog(CAR_LIST_CATALOG));
    const cityList = useSelector(getCatalog(CITY_LIST_CATALOG));
    const statusList = useSelector(getCatalog(STATUS_LIST_CATALOG));

    const location = useLocation();
    const history = useHistory();

    // Готовим данные для селектора времени
    const dateSelectorItems = [
        {name: 'За все время', value: NO_FILTER_VALUE},
        {name: 'С начала текущего дня', value: BEGIN_DAY},
        {name: 'За сутки', value: PER_DAY},
        {name: 'С начала текущей недели', value: BEGIN_WEEK},
        {name: 'За неделю', value: PER_WEEK},
        {name: 'С начала текущего месяца', value: BEGIN_MONTH},
        {name: 'За месяц', value: PER_MONTH},
    ];

    const handleDateSelect = value => setSelectedDate(value);

    // Готовим данные для селектора моделей авто
    const carSelectorItems = [{name: 'Все модели', value: NO_FILTER_VALUE}];
    for (let {id, name} of carList) carSelectorItems.push({name, value: id});

    const handleCarSelect = value => setSelectedCar(value);

    // Готовим данные для селектора городов
    const citySelectorItems = [{name: 'Любой город', value: NO_FILTER_VALUE}];
    for (let {id, name} of cityList) citySelectorItems.push({name, value: id});

    const handleCitySelect = value => setSelectedCity(value);

    // Готовим данные для селектора по статусам заказов
    const statusSelectorItems = [{name: 'Любой статус', value: NO_FILTER_VALUE}];
    for (let {id, name} of statusList) statusSelectorItems.push({name, value: id});

    const handleStatusSelect = value => setSelectedStatus(value);

    // Обработчик применения фильтров
    const handleApplyFilters = () => {
        const params = new URLSearchParams(location.search);

        if (selectedDate === NO_FILTER_VALUE) {
            params.delete(DATE_FILTER_NAME);
        } else {
            params.set(DATE_FILTER_NAME, selectedDate);
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

    return (
        <div className="order_filters">
            <div className="order_filters__selectors_block">
                <Selector items={dateSelectorItems} handleSelect={handleDateSelect}/>
                <Selector items={carSelectorItems} handleSelect={handleCarSelect}/>
                <Selector items={citySelectorItems} handleSelect={handleCitySelect}/>
                <Selector items={statusSelectorItems} handleSelect={handleStatusSelect}/>
            </div>
            <div className="order_filters__control_block">
                <button className="button button_red">Сброс</button>
                <button className="button button_blue" onClick={handleApplyFilters}>Применить</button>
            </div>
        </div>
    );
}

export default OrderFilters;