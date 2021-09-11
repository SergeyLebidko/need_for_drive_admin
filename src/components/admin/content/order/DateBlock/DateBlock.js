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
            <div className="date_block__from_block">
                <label>Дата начала аренды</label>
                <DatePicker selected={dateFrom}/>
            </div>
            <div className="date_block__to_block">
                <label>Дата окончания аренды</label>
                <DatePicker selected={dateTo}/>
            </div>
        </div>
    );
}

export default DateBlock;