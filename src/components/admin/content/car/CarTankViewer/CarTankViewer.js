import React from 'react';
import {useSelector} from 'react-redux';
import LineIndicator from '../../../../common/LineIndicator/LineIndicator';
import {getCarTank} from '../../../../../store/selectors';
import './CarTankViewer.scss';

function CarTankViewer() {
    const tank = useSelector(getCarTank);

    const hasTankValue = tank !== null && tank !== undefined;

    return (
        <div className="car_tank_viewer">
            <div className="car_tank_viewer__value_block">
                <span>Заполнено</span>
                <span>{hasTankValue ? tank : '-'}</span>
            </div>
            <LineIndicator value={hasTankValue ? tank : 0}/>
        </div>
    );
}

export default CarTankViewer;