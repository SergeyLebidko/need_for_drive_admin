import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {gedCarDescription} from '../../../../../store/selectors';
import {setEntityField} from '../../../../../store/actionCreators';
import {getRandomString} from '../../../../../utils/common_utils';
import './CarDescription.scss';

function CarDescription() {
    const dispatch = useDispatch();
    const description = useSelector(gedCarDescription);

    const handleDescriptionChange = event => dispatch(setEntityField('description', event.target.value));

    const areaId = getRandomString();

    return (
        <div className="car_description">
            <label htmlFor={areaId}>Описание</label>
            <textarea id={areaId} value={description} onChange={handleDescriptionChange}/>
        </div>
    );
}

export default CarDescription;