import React from 'react';
import './PlaceBlock.scss';
import Selector from "../../../../common/Selector/Selector";

function PlaceBlock(){
    return (
        <div className="place_block">
            <Selector label="Город"/>
            <Selector label="Пункт выдачи"/>
        </div>
    );
}

export default PlaceBlock;