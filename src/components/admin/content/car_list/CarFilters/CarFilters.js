import React, {useState, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getCatalog} from '../../../../../store/selectors';
import {useHistory, useLocation} from 'react-router-dom';
import Selector from '../../../../common/Selector/Selector';
import TextField from '../../../../common/TextField/TextField';
import FilterControlBlock from '../../../../common/FilterControlBlock/FilterControlBlock';
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
import {createSearchString, extractSearchParams, isWholePositiveOrZero} from '../../../../../utils/common_utils';
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
        const paramNames = [CATEGORY_FILTER_NAME, PRICE_MIN_FILTER_NAME, PRICE_MAX_FILTER_NAME, TANK_FILTER_NAME];
        const [category, priceMin, priceMax, tank] = extractSearchParams(location, paramNames);

        setSelectedCategory(category || NO_FILTER_VALUE);
        setPriceMin(isWholePositiveOrZero(priceMin) ? '' + priceMin : '');
        setPriceMax(isWholePositiveOrZero(priceMax) ? '' + priceMax : '');

        const hasDefaultTankFind = tankSelectorItems.some(item => item.value === tank);
        setSelectedTank(hasDefaultTankFind ? tank : NO_FILTER_VALUE);
    }, [location]);

    // Готовим данные для селекторов категории и уровня топлива
    const categorySelectorItems = useMemo(() => {
        return [{value: NO_FILTER_VALUE, name: 'Все категории'}, ...categoryList.map(({id, name}) => ({
            value: id,
            name
        }))];
    }, [categoryList]);

    const tankSelectorItems = useMemo(() => {
        const levels = [];
        for (let level = 10; level <= 100; level += 10) levels.push({
            value: '' + level,
            name: `Не менее ${level}%`
        });
        return [{value: NO_FILTER_VALUE, name: 'Любой уровень топлива'}, ...levels];
    }, []);

    const handleCategorySelect = value => setSelectedCategory(value);
    const handleTankSelect = value => setSelectedTank(value);
    const handleChangePriceFrom = event => {
        setPriceMin(event.target.value);
        setPriceMinError(null);
    };
    const handleChangePriceTo = event => {
        setPriceMax(event.target.value);
        setPriceMaxError(null);
    };

    const handleApplyFilters = () => {
        const priceError = 'Допустимы только целые неотрицательные значения';
        const minError = priceMin !== '' && !isWholePositiveOrZero(priceMin);
        const maxError = priceMax !== '' && !isWholePositiveOrZero(priceMax);
        if (minError) setPriceMinError(priceError);
        if (maxError) setPriceMaxError(priceError);
        if (minError || maxError) return;

        const params = createSearchString({
            [PAGE_FILTER_NAME]: '0',
            [CATEGORY_FILTER_NAME]: selectedCategory,
            [PRICE_MIN_FILTER_NAME]: priceMin,
            [PRICE_MAX_FILTER_NAME]: priceMax,
            [TANK_FILTER_NAME]: selectedTank
        });
        history.push(`/${ADMIN_APP_URL}/${CAR_LIST_APP_URL}/?${params}`);
    }

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
            <FilterControlBlock handleApply={handleApplyFilters} handleReset={handleResetFilters}/>
        </div>
    );
}

export default CarFilters;