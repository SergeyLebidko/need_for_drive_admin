import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {useSelector, useDispatch} from 'react-redux';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import CarInfo from '../CarInfo/CarInfo';
import {getCarId, getCarThumbnail} from '../../../../../store/selectors';
import {setEntityField, setPopupMessage} from '../../../../../store/actionCreators';
import {getRandomString} from '../../../../../utils/common_utils';
import {FAIL} from '../../../../../constants/settings';
import './CarPhotoChooser.scss';

function CarPhotoChooser({errorText, resetErrorText}) {
    const id = useSelector(getCarId);
    const thumbnail = useSelector(getCarThumbnail);

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
            resetErrorText();
        };
        fileReader.onerror = () => {
            dispatch(setPopupMessage(FAIL, 'Не удалось загрузить изображение'));
            setPhotoPath(null);
        }
    }

    const fileInputId = getRandomString();

    const fileSelectorClasses = classNames('car_photo_chooser__file_selector', {'file_input_error': !!errorText});

    return (
        <div className="car_photo_chooser">
            <PhotoBlock photoPath={photoPath}/>
            {id && <CarInfo/>}
            <div className={fileSelectorClasses}>
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
            {errorText && <span className="file_input_error_text">{errorText}</span>}
        </div>
    );
}

CarPhotoChooser.propTypes = {
    errorText: PropTypes.string,
    resetErrorText: PropTypes.func
}

export default CarPhotoChooser;