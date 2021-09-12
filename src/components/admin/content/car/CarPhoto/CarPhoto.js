import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import {getCarCategory, getCarName, getCarThumbnail} from '../../../../../store/selectors';
import {setEntityField, setPopupMessage} from '../../../../../store/actionCreators';
import {FAIL} from '../../../../../constants/settings';
import './CarPhoto.scss';

function CarPhoto() {
    const name = useSelector(getCarName);
    const category = useSelector(getCarCategory);
    const thumbnail = useSelector(getCarThumbnail);

    const [photoPath, setPhotoPath] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!thumbnail) {
            setPhotoPath(null);
            return;
        }
        if ('path' in thumbnail) setPhotoPath(thumbnail.path);
    }, [thumbnail]);

    const handleFileSelect = event => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            dispatch(setPopupMessage(FAIL, 'Допустимы только файлы изображений в форматах JPEG и PNG'));
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = event => {
            dispatch(setEntityField('thumbnail', file));
            setPhotoPath(event.currentTarget.result);
        };
        fileReader.onerror = () => {
            dispatch(setPopupMessage(FAIL, 'Не удалось загрузить изображение'));
            setPhotoPath(null);
        }
    }


    return (
        <div className="car_photo">
            <PhotoBlock photoPath={photoPath}/>
            <div>
                {name && name}
                {category && category.name}
            </div>
            <input type="file" onChange={handleFileSelect}/>
        </div>
    );
}

export default CarPhoto;