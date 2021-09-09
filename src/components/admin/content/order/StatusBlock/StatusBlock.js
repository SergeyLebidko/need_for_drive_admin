import React, {useEffect, useState} from 'react';
import Selector from '../../../../common/Selector/Selector';
import {useSelector, useDispatch} from 'react-redux';
import {getCatalog, getOrderStatus} from '../../../../../store/selectors';
import {setEntityField} from '../../../../../store/actionCreators';
import {NO_FILTER_VALUE, STATUS_LIST_CATALOG} from '../../../../../constants/settings';
import './StatusBlock.scss';

function StatusBlock() {
    const [statusListForSelector, setStatusListForSelector] = useState([]);

    const statusList = useSelector(getCatalog(STATUS_LIST_CATALOG));
    const selectedStatus = useSelector(getOrderStatus);

    const dispatch = useDispatch();

    const prepareItem = item => {
        if (!item) return {value: NO_FILTER_VALUE, name: 'Статус не выбран'};
        return {value: item.id, name: item.name}
    }

    const prepareItems = items => items.map(item => prepareItem(item));

    useEffect(() => {
        let nextList = [];
        if (!selectedStatus) nextList.push(null);
        nextList = nextList.concat(statusList);
        setStatusListForSelector(nextList);
    }, [selectedStatus]);

    const handleStatusSelect = value => {
        if (value === NO_FILTER_VALUE && !selectedStatus) return;
        if (value === selectedStatus.id) return;
        dispatch(setEntityField('orderStatusId', statusList.find(status => status.id === value)));
    }

    return (
        <div className="status_block">
            <Selector
                items={prepareItems(statusListForSelector)}
                handleSelect={handleStatusSelect}
                label="Статус заказа"
            />
        </div>
    );
}

export default StatusBlock;