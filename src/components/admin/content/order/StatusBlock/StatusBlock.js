import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {getCatalog, getOrderStatus} from '../../../../../store/selectors';
import {setEntityField} from '../../../../../store/actionCreators';
import Selector from '../../../../common/Selector/Selector';
import {STATUS_LIST_CATALOG} from '../../../../../constants/settings';
import {prepareItemForSelector, prepareItemsForSelector} from '../../../../../utils/common_utils';
import './StatusBlock.scss';

function StatusBlock({errorText, resetErrorText}) {
    const statusList = useSelector(getCatalog(STATUS_LIST_CATALOG));

    const [statusListForSelector, setStatusListForSelector] = useState([]);
    const selectedStatus = useSelector(getOrderStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        const nextList = [...statusList];
        if (!selectedStatus) nextList.unshift(null);
        setStatusListForSelector(nextList);
    }, [selectedStatus]);

    const handleStatusSelect = value => {
        if (value === prepareItemForSelector(selectedStatus).value) return;
        dispatch(setEntityField('orderStatusId', statusList.find(status => status && status.id === value)));
        resetErrorText();
    }

    return (
        <div className="status_block">
            <Selector
                items={prepareItemsForSelector(statusListForSelector)}
                value={prepareItemForSelector(selectedStatus).value}
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