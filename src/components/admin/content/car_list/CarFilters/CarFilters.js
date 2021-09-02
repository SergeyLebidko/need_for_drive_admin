import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getCatalog} from '../../../../../store/selectors';
import {useHistory, useLocation} from 'react-router-dom';
import Selector from '../../../../common/Selector/Selector';
import TextField from '../../../../common/TextField/TextField';
import {
    CAR_CATEGORY_CATALOG,
    CATEGORY_FILTER_NAME,
    PAGE_FILTER_NAME,
    PRICE_MAX_FILTER_NAME,
    PRICE_MIN_FILTER_NAME,
    TANK_FILTER_NAME
} from '../../../../../constants/settings';
import {NO_FILTER_VALUE} from '../../../../../constants/settings';
import {ADMIN_APP_URL, CAR_LIST_APP_URL} from '../../../../../constants/urls';
import './CarFilters.scss';

function CarFilters() {
    const history = useHistory();
    const location = useLocation();

    const [selectedCategory, setSelectedCategory] = useState(NO_FILTER_VALUE);
    const [priceMin, setPriceMin] = useState('');
    const [priceMinError, setPriceMinError] = useState(null);
    const [priceMax, setPriceMax] = useState('');
    const [priceMaxError, setPriceMaxError] = useState(null);
    const [selectedTank, setSelectedTank] = useState(NO_FILTER_VALUE);

    const categoryList = useSelector(getCatalog(CAR_CATEGORY_CATALOG));

    // Определяем начальные значения фильтров по параметрам из адресной строки
    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const defaultCategory = params.get(CATEGORY_FILTER_NAME);
        const defaultPriceMin = params.get(PRICE_MIN_FILTER_NAME);
        const defaultPriceMax = params.get(PRICE_MAX_FILTER_NAME);
        const defaultTank = params.get(TANK_FILTER_NAME);

        setSelectedCategory(defaultCategory ? defaultCategory : NO_FILTER_VALUE);
        setPriceMin(isNatural(defaultPriceMin) ? '' + defaultPriceMin : '');
        setPriceMax(isNatural(defaultPriceMax) ? '' + defaultPriceMax : '');
        setSelectedTank(
            tankSelectorItems.find(item => item.value === defaultTank && item.value !== NO_FILTER_VALUE) ? defaultTank : NO_FILTER_VALUE
        );

    }, [])

    const isNatural = value => {
        const _value = +value;
        return !(isNaN(_value) || _value < 0 || Math.floor(_value) !== _value || value === null || value === undefined);
    }

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
    const handleChangePriceFrom = event => {
        setPriceMin(event.target.value);
        setPriceMinError(null);
    };
    const handleChangePriceTo = event => {
        setPriceMax(event.target.value);
        setPriceMaxError(null);
    };
    const handleTankSelect = value => setSelectedTank(value);

    // Обработчик применения фильтров
    const handleApplyFilters = () => {
        const priceError = 'Допустимы только целые неотрицательные значения';
        const minError = priceMin !== '' && !isNatural(priceMin);
        const maxError = priceMax !== '' && !isNatural(priceMax);
        if (minError) setPriceMinError(priceError);
        if (maxError) setPriceMaxError(priceError);
        if (minError || maxError) return;

        const params = new URLSearchParams(location.search);

        // При изменении любого фильтра - начинаем с первой страницы
        params.set(PAGE_FILTER_NAME, '0');

        if (selectedCategory === NO_FILTER_VALUE) {
            params.delete(CATEGORY_FILTER_NAME);
        } else {
            params.set(CATEGORY_FILTER_NAME, selectedCategory);
        }
        if (!priceMin) {
            params.delete(PRICE_MIN_FILTER_NAME)
        } else {
            params.set(PRICE_MIN_FILTER_NAME, priceMin);
        }
        if (!priceMax) {
            params.delete(PRICE_MAX_FILTER_NAME);
        } else {
            params.set(PRICE_MAX_FILTER_NAME, priceMax);
        }
        if (selectedTank === NO_FILTER_VALUE) {
            params.delete(TANK_FILTER_NAME);
        } else {
            params.set(TANK_FILTER_NAME, selectedTank);
        }

        history.push(`/${ADMIN_APP_URL}/${CAR_LIST_APP_URL}/?${params}`);
    }

    // Обработчик сброса фильтров
    const handleResetFilters = () => {
        setSelectedCategory(NO_FILTER_VALUE);
        setPriceMin('');
        setPriceMinError(null);
        setPriceMax('');
        setPriceMaxError(null);
        setSelectedTank(NO_FILTER_VALUE);

        history.push(`/${ADMIN_APP_URL}/${CAR_LIST_APP_URL}/?${PAGE_FILTER_NAME}=0`);
    }

    return (
        <div className="car_filters">
            <div className="car_filters__conditions">
                <Selector items={categorySelectorItems} value={selectedCategory} handleSelect={handleCategorySelect}/>
                <TextField
                    value={priceMin}
                    handleChangeValue={handleChangePriceFrom}
                    errorText={priceMinError}
                    placeholder="Цена от..."
                />
                <TextField
                    value={priceMax}
                    handleChangeValue={handleChangePriceTo}
                    errorText={priceMaxError}
                    placeholder="Цена до..."
                />
                <Selector items={tankSelectorItems} value={selectedTank} handleSelect={handleTankSelect}/>
            </div>
            <div className="car_filters__control">
                <button className="button button_red" onClick={handleResetFilters}>Сбросить</button>
                <button className="button button_blue" onClick={handleApplyFilters}>Применить</button>
            </div>
        </div>
    );
}

export default CarFilters;