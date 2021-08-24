import React, {useState} from 'react';
import {useSelector} from 'react-redux';
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
    STATUS_LIST_CATALOG
} from '../../../../settings';
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
    for (let {id, name} of carList)carSelectorItems.push({name, value: id});

    const handleCarSelect = value => setSelectedCar(value);

    // Готовим данные для селектора городов
    const citySelectorItems = [{name: 'Любой город', value: NO_FILTER_VALUE}];
    for (let {id, name} of cityList) citySelectorItems.push({name, value: id});

    const handleCitySelect = value => setSelectedCity(value);

    // Готовим данные для селектора по статусам заказов
    const statusSelectorItems = [{name: 'Любой статус', value: NO_FILTER_VALUE}];
    for (let {id, name} of statusList) statusSelectorItems.push({name, value: id});

    const handleStatusSelect = value => setSelectedStatus(value);

    // TODO Удалить тестовые выводы в консоль
    console.log(selectedDate);
    console.log(selectedCar);
    console.log(selectedCity);
    console.log(selectedStatus);

    return (
        <div className="order_filters">
            <Selector items={dateSelectorItems} handleSelect={handleDateSelect}/>
            <Selector items={carSelectorItems} handleSelect={handleCarSelect}/>
            <Selector items={citySelectorItems} handleSelect={handleCitySelect}/>
            <Selector items={statusSelectorItems} handleSelect={handleStatusSelect}/>
        </div>
    );
}

export default OrderFilters;