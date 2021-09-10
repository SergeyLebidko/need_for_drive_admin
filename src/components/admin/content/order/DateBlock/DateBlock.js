import React from 'react';
import {useSelector} from 'react-redux';
import ru from 'date-fns/locale/ru';
import DatePicker, {setDefaultLocale} from 'react-datepicker';
import {getOrderDateFrom, getOrderDateTo} from '../../../../../store/selectors';
import 'react-datepicker/dist/react-datepicker.css';
import './DateBlock.scss';

setDefaultLocale(ru);

function DateBlock() {
    const dateFrom = useSelector(getOrderDateFrom);
    const dateTo = useSelector(getOrderDateTo);

    return (
        <div className="date_block">
            <DatePicker selected={dateFrom}/>
            <DatePicker selected={dateTo}/>
        </div>
    );
}

export default DateBlock;