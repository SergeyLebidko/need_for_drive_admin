import React, {useEffect, useState} from 'react';
import './StatusBlock.scss';
import Selector from '../../../../common/Selector/Selector';

function StatusBlock() {
    const [statusListForSelector, setStatusListForSelector] = useState([]);

    useEffect(() => {
        setStatusListForSelector([]);
    }, []);

    return (
        <div className="status_block">
            <Selector items={statusListForSelector} label="Статус заказа"/>
        </div>
    );
}

export default StatusBlock;