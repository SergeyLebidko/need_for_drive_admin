import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import CarInfo from '../CarInfo/CarInfo';
import {getEntity} from '../../../../../store/selectors';
import {setEntityField, setPopupMessage} from '../../../../../store/actionCreators';
import {getRandomString} from '../../../../../utils/common_utils';
import {FAIL} from '../../../../../constants/settings';
import './CarPhotoChooser.scss';

function CarPhotoChooser() {
    const {id: carId, thumbnail} = useSelector(getEntity);

    const [photoPath, setPhotoPath] = useState(null);
    const fileSelectorRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!thumbnail) {
            setPhotoPath(null);
            fileSelectorRef.current.value = null;
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
        };
        fileReader.onerror = () => {
            dispatch(setPopupMessage(FAIL, 'Не удалось загрузить изображение'));
            setPhotoPath(null);
        }
    }

    const fileInputId = getRandomString();

    return (
        <div className="car_photo_chooser">
            <PhotoBlock photoPath={photoPath}/>
            {carId && <CarInfo/>}
            <div className="car_photo_chooser__file_selector">
                <input
                    type="file"
                    id={fileInputId}
                    accept="image/png, image/jpeg"
                    onChange={handleFileSelect}
                    ref={fileSelectorRef}
                />
                <label htmlFor={fileInputId} className="car_photo_chooser__file_name">
                    {(thumbnail instanceof File) ? thumbnail.name : 'Выберите файл...'}
                </label>
                <label htmlFor={fileInputId} className="car_photo_chooser__file_choose">Обзор</label>
            </div>
        </div>
    );
}

export default CarPhotoChooser;