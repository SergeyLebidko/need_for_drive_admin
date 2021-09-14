import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Selector from '../Selector/Selector';
import {getCarCategory, getCatalog} from '../../../store/selectors';
import {prepareItemForSelector, prepareItemsForSelector} from '../../../utils/common_utils';
import {setEntityField} from '../../../store/actionCreators';
import './CatalogSelector.scss';

function CatalogSelector({label, catalogName, entityField, errorText, resetErrorText, nameExtractor}) {
    const catalog = useSelector(getCatalog(catalogName));

    const [itemsForSelector, setItemsForSelector] = useState([]);
    const selectedValue = useSelector(getCarCategory);

    const dispatch = useDispatch();

    useEffect(() => {
        const nextList = [...catalog];
        if (!selectedValue) nextList.unshift(null);
        setItemsForSelector(nextList);
    }, [selectedValue]);

    const handleSelect = value => {
        dispatch(setEntityField(entityField, catalog.find(item => item.id === value)));
        resetErrorText();
    }

    return (
        <div className="catalog_selector">
            <Selector
                label={label}
                items={prepareItemsForSelector(itemsForSelector, nameExtractor)}
                value={prepareItemForSelector(selectedValue, nameExtractor)}
                handleSelect={handleSelect}
                errorText={errorText}
            />
        </div>
    );
}

CatalogSelector.defaulpProps = {
    nameExtractor: null
}

CatalogSelector.propTypes = {
    label: PropTypes.string,
    catalogName: PropTypes.string,
    entityField: PropTypes.string,
    errorText: PropTypes.string,
    resetErrorText: PropTypes.func,
    nameExtractor: PropTypes.func
}

export default CatalogSelector;