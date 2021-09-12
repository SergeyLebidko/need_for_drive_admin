import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import {getCarCategory, getCarName, getCarThumbnail} from '../../../../../store/selectors';
import {setEntityField, setPopupMessage} from '../../../../../store/actionCreators';
import {getRandomString} from '../../../../../utils/common_utils';
import {FAIL} from '../../../../../constants/settings';
import './CarPhoto.scss';

function CarPhoto() {
    const name = useSelector(getCarName);
    const category = useSelector(getCarCategory);
    const thumbnail = useSelector(getCarThumbnail);

    const [photoPath, setPhotoPath] = useState(null);
    const [fileName, setFileName] = useState(null);

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

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = event => {
            dispatch(setEntityField('thumbnail', file));
            setPhotoPath(event.currentTarget.result);
            setFileName(file.name);
        };
        fileReader.onerror = () => {
            dispatch(setPopupMessage(FAIL, 'Не удалось загрузить изображение'));
            setPhotoPath(null);
        }
    }

    const fileInputId = getRandomString();

    return (
        <div className="car_photo">
            <PhotoBlock photoPath={photoPath}/>
            <div className="car_photo__info">
                {name && <span className="car_photo__name_caption">{name}</span>}
                {category && <span className="car_photo__category_caption">{category.name}</span>}
            </div>
            <div className="car_photo__file_selector">
                <input type="file" id={fileInputId} accept="image/png, image/jpeg" onChange={handleFileSelect}/>
                <label htmlFor={fileInputId} className="car_photo__file_name">
                    {fileName ? fileName : 'Выберите файл...'}
                </label>
                <label htmlFor={fileInputId} className="car_photo__file_choose">Обзор</label>
            </div>
        </div>
    );
}

export default CarPhoto;