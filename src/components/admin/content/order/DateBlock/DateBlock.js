import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ru from 'date-fns/locale/ru';
import DatePicker, {setDefaultLocale} from 'react-datepicker';
import {getOrderDateFrom, getOrderDateTo} from '../../../../../store/selectors';
import {setEntityField} from '../../../../../store/actionCreators';
import 'react-datepicker/dist/react-datepicker.css';
import './DateBlock.scss';

setDefaultLocale(ru);

function DateBlock() {
    const dateFrom = useSelector(getOrderDateFrom);
    const dateTo = useSelector(getOrderDateTo);

    const dispatch = useDispatch();

    const commonDatePickerProps = {
        showTimeInput: true,
        dateFormat: 'Pp',
        locale: ru,
        timeCaption: 'Время',
        isClearable: true
    }

    const handleChangeDateFrom = value => dispatch(setEntityField('dateFrom', +value));
    const handleChangeDateTo = value => dispatch(setEntityField('dateTo', +value));

    return (
        <div className="date_block">
            <div className="date_block__from_block">
                <label>Дата начала аренды</label>
                <DatePicker selected={dateFrom} {...commonDatePickerProps} onChange={handleChangeDateFrom}/>
            </div>
            <div className="date_block__to_block">
                <label>Дата окончания аренды</label>
                <DatePicker selected={dateTo} {...commonDatePickerProps} onChange={handleChangeDateTo}/>
            </div>
        </div>
    );
}

export default DateBlock;