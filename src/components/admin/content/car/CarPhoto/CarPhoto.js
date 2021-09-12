import React from 'react';
import {useSelector} from 'react-redux';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import {getCarCategory, getCarName, getCarThumbnail} from '../../../../../store/selectors';
import './CarPhoto.scss';

function CarPhoto(){
    const name = useSelector(getCarName);
    const category = useSelector(getCarCategory);
    const thumbnail = useSelector(getCarThumbnail);

    return (
        <div className="car_photo">
            <PhotoBlock photoPath={thumbnail.path}/>
            <div>
                {name && name}
                {category && category.name}
            </div>
        </div>
    );
}

export default CarPhoto;