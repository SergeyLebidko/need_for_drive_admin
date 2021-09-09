import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {getCatalog, getOrderStatus} from '../../../../../store/selectors';
import {setEntityField} from '../../../../../store/actionCreators';
import Selector from '../../../../common/Selector/Selector';
import {NO_FILTER_VALUE, STATUS_LIST_CATALOG} from '../../../../../constants/settings';
import './StatusBlock.scss';

function StatusBlock({errorText, resetErrorText}) {
    const statusList = useSelector(getCatalog(STATUS_LIST_CATALOG));

    const [statusListForSelector, setStatusListForSelector] = useState([]);
    const selectedStatus = useSelector(getOrderStatus);

    const dispatch = useDispatch();

    const prepareItem = item => {
        if (!item) return {value: NO_FILTER_VALUE, name: 'Статус не выбран'};
        return {value: item.id, name: item.name}
    }

    const prepareItems = items => items.map(item => prepareItem(item));

    useEffect(() => {
        const nextList = [...statusList];
        if (!selectedStatus) nextList.unshift(null);
        setStatusListForSelector(nextList);
    }, [selectedStatus]);

    const handleStatusSelect = value => {
        if (value === prepareItem(selectedStatus).value) return;
        dispatch(setEntityField('orderStatusId', statusList.find(status => status.id === value)));
        resetErrorText();
    }

    return (
        <div className="status_block">
            <Selector
                items={prepareItems(statusListForSelector)}
                value={prepareItem(selectedStatus).value}
                handleSelect={handleStatusSelect}
                label="Статус заказа"
                errorText={errorText}
            />
        </div>
    );
}

StatusBlock.propTypes = {
    errorText: PropTypes.string,
    resetErrorText: PropTypes.func
}

export default StatusBlock;