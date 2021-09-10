import React from 'react';
import Selector from '../../../../common/Selector/Selector';
import './RateBlock.scss';
import {useSelector, useDispatch} from 'react-redux';
import {getCatalog, getOrderRate} from '../../../../../store/selectors';
import {NO_FILTER_VALUE, RATE_LIST_CATALOG} from '../../../../../constants/settings';
import {prepareItemForSelector, prepareItemsForSelector} from '../../../../../utils/common_utils';
import {setEntityField} from "../../../../../store/actionCreators";

function RateBlock() {
    const rateList = useSelector(getCatalog(RATE_LIST_CATALOG));
    const rateListForSelector = [null, ...rateList];

    const selectedRate = useSelector(getOrderRate);

    const dispatch = useDispatch();

    const rateNameExtractor = rate => `${rate.rateTypeId.name} (${rate.price}р./${rate.rateTypeId.unit})`;

    const handleRateSelect = value => {
        if (value === prepareItemForSelector(selectedRate).value) return;
        if (value === NO_FILTER_VALUE) {
            dispatch(setEntityField('rateId', null));
            return;
        }
        dispatch(setEntityField('rateId', rateList.find(rate => rate.id === value)));
    }

    return (
        <div className="rate_block">
            <Selector
                items={prepareItemsForSelector(rateListForSelector, rateNameExtractor)}
                value={prepareItemForSelector(selectedRate, rateNameExtractor).value}
                handleSelect={handleRateSelect}
                label="Тариф"
            />
        </div>
    );
}

export default RateBlock;