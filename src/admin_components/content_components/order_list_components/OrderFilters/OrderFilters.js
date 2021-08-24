import React from 'react';
import Selector from '../../../../common_components/Selector/Selector';
import './OrderFilters.scss';

function OrderFilters() {
    const defaultItem = {name: 'Второй', value: 'second'};

    const items = [
        {name: 'Первый', value: 'first'},
        defaultItem,
        {name: 'Третий', value: 'third'},
        {name: 'Четвертый', value: 'four'}
    ];

    const handleSelect = e => console.log(e.target.value);

    return (
        <div className="order_filters">
            <Selector items={items} defaultItem={defaultItem} handleSelect={handleSelect}/>
        </div>
    );
}

export default OrderFilters;