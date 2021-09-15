import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Selector from '../Selector/Selector';
import {getCatalog} from '../../../store/selectors';
import {prepareItemForSelector, prepareItemsForSelector} from '../../../utils/common_utils';
import {setEntityField} from '../../../store/actionCreators';
import './CatalogSelector.scss';

function CatalogSelector(props) {
    const {
        label,
        catalogName,
        entityField,
        fieldGetter,
        errorText,
        resetErrorText,
        nameExtractor,
        entityDataExtractor,
        itemsListCreator
    } = props;

    const catalog = useSelector(getCatalog(catalogName));

    const [itemsForSelector, setItemsForSelector] = useState([]);
    const selectedValue = useSelector(fieldGetter);

    const dispatch = useDispatch();

    useEffect(() => {
        let nextList;
        if (itemsListCreator) {
            nextList = itemsListCreator(catalog, selectedValue);
        } else {
            nextList = [...catalog];
            if (!selectedValue) nextList.unshift(null);
        }
        setItemsForSelector(nextList);
    }, [selectedValue]);

    const handleSelect = value => {
        let nextFieldValue = catalog.find(item => item.id === value);
        nextFieldValue = entityDataExtractor ? entityDataExtractor(nextFieldValue) : nextFieldValue;
        dispatch(setEntityField(entityField, nextFieldValue));
        if (resetErrorText) resetErrorText();
    }

    return (
        <div className="catalog_selector">
            <Selector
                label={label}
                items={prepareItemsForSelector(itemsForSelector, nameExtractor)}
                value={prepareItemForSelector(selectedValue, nameExtractor).value}
                handleSelect={handleSelect}
                errorText={errorText}
            />
        </div>
    );
}

CatalogSelector.defaulpProps = {
    nameExtractor: null,
    entityDataExtractor: null,
    itemsListCreator: null,
    errorText: null,
    resetErrorText: null
}

CatalogSelector.propTypes = {
    label: PropTypes.string,
    catalogName: PropTypes.string,
    entityField: PropTypes.string,
    fieldGetter: PropTypes.func,
    errorText: PropTypes.string,
    resetErrorText: PropTypes.func,
    nameExtractor: PropTypes.func,
    entityDataExtractor: PropTypes.func,
    itemsListCreator: PropTypes.func
}

export default CatalogSelector;