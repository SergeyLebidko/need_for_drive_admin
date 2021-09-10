import React from 'react';
import Selector from '../../../../common/Selector/Selector';
import './RateBlock.scss';

function RateBlock(){
    return (
        <div className="rate_block">
            <Selector label="Тариф"/>
        </div>
    );
}

export default RateBlock;