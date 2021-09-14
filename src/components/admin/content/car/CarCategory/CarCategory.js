import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import Selector from '../../../../common/Selector/Selector';
import {getCarCategory, getCatalog} from '../../../../../store/selectors';
import {setEntityField} from '../../../../../store/actionCreators';
import {prepareItemForSelector, prepareItemsForSelector} from '../../../../../utils/common_utils';
import {CAR_CATEGORY_CATALOG} from '../../../../../constants/settings';
import './CarCategory.scss';

function CarCategory({errorText, resetErrorText}) {
    const categoryList = useSelector(getCatalog(CAR_CATEGORY_CATALOG));

    const [categoryListForSelector, setCategoryForSelector] = useState([]);
    const selectedCategory = useSelector(getCarCategory);

    const dispatch = useDispatch();

    const nameExtractor = category => `${category.name} (${category.description})`;

    useEffect(() => {
        const nextList = [...categoryList];
        if (!selectedCategory) nextList.unshift(null);
        setCategoryForSelector(nextList);
    }, [selectedCategory]);

    const handleCategorySelect = value => {
        if (value === prepareItemForSelector(selectedCategory, nameExtractor).value) return;
        dispatch(setEntityField('categoryId', categoryList.find(category => category.id === value)));
        resetErrorText();
    }

    return (
        <div className="car_category">
            <Selector
                label="Тип автомобиля"
                items={prepareItemsForSelector(categoryListForSelector, nameExtractor)}
                value={prepareItemForSelector(selectedCategory, nameExtractor).value}
                handleSelect={handleCategorySelect}
                errorText={errorText}
            />
        </div>
    );
}

CarCategory.propTypes = {
    errorText: PropTypes.string,
    resetErrorText: PropTypes.func
}

export default CarCategory;