import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {getCatalog, getOrderStatus} from '../../../../../store/selectors';
import {setEntityField} from '../../../../../store/actionCreators';
import Selector from '../../../../common/Selector/Selector';
import {NO_FILTER_VALUE, STATUS_LIST_CATALOG} from '../../../../../constants/settings';
import './StatusBlock.scss';

function StatusBlock({error}) {
    const [statusListForSelector, setStatusListForSelector] = useState([]);

    const statusList = useSelector(getCatalog(STATUS_LIST_CATALOG));
    const selectedStatus = useSelector(getOrderStatus);
    const [selectorError, setSelectorError] = useState(error);

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

    useEffect(() => setSelectorError(error), [error]);

    const handleStatusSelect = value => {
        if (value === NO_FILTER_VALUE && !selectedStatus) return;
        if (value === selectedStatus.id) return;
        dispatch(setEntityField('orderStatusId', statusList.find(status => status.id === value)));
        setSelectorError(null);
    }

    return (
        <div className="status_block">
            <Selector
                items={prepareItems(statusListForSelector)}
                value={prepareItem(selectedStatus).value}
                handleSelect={handleStatusSelect}
                label="Статус заказа"
                errorText={selectorError}
            />
        </div>
    );
}

StatusBlock.propTypes = {
    error: PropTypes.func
}

export default StatusBlock;