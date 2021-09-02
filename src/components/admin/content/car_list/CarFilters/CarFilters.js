import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {getCatalog} from '../../../../../store/selectors';
import Selector from '../../../../common/Selector/Selector';
import TextField from '../../../../common/TextField/TextField';
import {CAR_CATEGORY_CATALOG} from '../../../../../constants/settings';
import {NO_FILTER_VALUE} from '../../../../../constants/settings';
import './CarFilters.scss';

function CarFilters() {
    const [selectedCategory, setSelectedCategory] = useState(NO_FILTER_VALUE);
    const [selectedTank, setSelectedTank] = useState(NO_FILTER_VALUE);

    const categoryList = useSelector(getCatalog(CAR_CATEGORY_CATALOG));

    // Готовим данные для селектора категорий
    const categorySelectorItems = [{value: NO_FILTER_VALUE, name: 'Все категории'}];
    for (const {id, name} of categoryList) categorySelectorItems.push({value: id, name});

    // Готовим данные для селектора уровня топлива
    const tankSelectorItems = [{value: NO_FILTER_VALUE, name: 'Любой уровень топлива'}];
    for (let level = 10; level <= 100; level += 10) tankSelectorItems.push({
        value: '' + level,
        name: `Не менее ${level}%`
    });

    // Обработчики выбора/ввода значений
    const handleCategorySelect = value => setSelectedCategory(value);

    const handleTankSelect = value => setSelectedTank(value);

    return (
        <div className="car_filters">
            <div className="car_filters__conditions">
                <Selector items={categorySelectorItems} value={selectedCategory} handleSelect={handleCategorySelect}/>
                <TextField placeholder="Цена от..."/>
                <TextField placeholder="Цена до..."/>
                <Selector items={tankSelectorItems} value={selectedTank} handleSelect={handleTankSelect}/>
            </div>
            <div className="car_filters__control">
                <button className="button button_red">Сбросить</button>
                <button className="button button_blue">Применить</button>
            </div>
        </div>
    );
}

export default CarFilters;