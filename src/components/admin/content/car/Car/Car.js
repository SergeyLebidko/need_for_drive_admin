import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import CarPhotoChooser from '../CarPhotoChooser/CarPhotoChooser';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import EditorControlBlock from '../../../../common/EditorControlBlock/EditorControlBlock';
import CarTankViewer from '../CarTankViewer/CarTankViewer';
import CarDescription from '../CarDescription/CarDescription';
import {useGlobalPreloader} from '../../../../../store/hooks';
import {
    loadCar,
    removeCar,
    saveCar,
    setEntity,
    setPopupMessage
} from '../../../../../store/actionCreators';
import {getEntity} from '../../../../../store/selectors';
import {FAIL, SUCCESS} from '../../../../../constants/settings';
import {ADMIN_APP_URL, CAR_EDIT_APP_URL, CAR_LIST_APP_URL} from '../../../../../constants/urls';
import './Car.scss';

function Car() {
    const [done, setDone] = useState(false);
    const [error, setError] = useState(null);
    const [showPreloader, hidePreloader] = useGlobalPreloader();

    const dispatch = useDispatch();
    const car = useSelector(getEntity);

    const [thumbnailError, setThumbnailError] = useState(null);

    const location = useLocation();
    const {params: {carId}} = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        setDone(false);
        setError(null);

        // Если идентификатор автомобиля не указан в URL, то инициализируем пустую новую сущность в хранилище
        if (!carId) {
            dispatch(setEntity({}));
            setDone(true);
            return;
        }

        // Если идентификатор автомобиля найден - пытаемся загрузить данные о нём
        showPreloader();
        dispatch(loadCar(carId))
            .catch(err => setError(err))
            .finally(() => {
                setDone(true);
                hidePreloader();
            });
    }, [location, carId]);

    // Блок функций сброса ошибок
    const resetThumbnailError = () => setThumbnailError(null);

    // Блок обработчиков кликов
    const handleSaveButtonClick = () => {
        if (!car.thumbnail) setThumbnailError('Выберите фото автомобиля');
        if (!car.thumbnail) return;

        // Пытаемся выполнить сохранение. Если сохраняли новый автомобиль, то переходим на страницу редактирования
        showPreloader();
        setError(null);
        dispatch(saveCar(car))
            .then(() => {
                dispatch(setPopupMessage(SUCCESS, 'Автомобиль успешно сохранен'));
                if (!carId) history.push(`/${ADMIN_APP_URL}/${CAR_EDIT_APP_URL}/${car.id}`);
            })
            .catch(err => setError(err))
            .finally(() => hidePreloader());
    }

    const handleCancelButtonClick = () => {
        if (carId) {
            history.push(`/${ADMIN_APP_URL}/${CAR_LIST_APP_URL}`);
            return
        }
        history.push(`/${ADMIN_APP_URL}`);
    }

    const handleRemoveButtonClick = () => {
        // Не даем выполнить удаление, если редактируем данные нового авто и машина еще не сохранена
        if (!carId) {
            dispatch(setPopupMessage(FAIL, 'Нельзя удалить не сохраненный автомобиль'));
            return;
        }

        showPreloader();
        setDone(false);
        setError(null);
        dispatch(removeCar(carId))
            .then(() => {
                dispatch(setPopupMessage(SUCCESS, 'Автомобиль успешно удален'));
                history.push(`/${ADMIN_APP_URL}`);
            })
            .catch(err => {
                setError(err);
                setDone(true);
            })
            .finally(() => hidePreloader());
    }

    if (error) return <ErrorPane error={error}/>;

    return (
        <div className="car">
            <h1 className="car__caption">Карточка автомобиля</h1>
            {done &&
            <div className="car__content_wrapper">
                <div className="car__content car__first_content_block">
                    <CarPhotoChooser errorText={thumbnailError} resetErrorText={resetThumbnailError}/>
                    <div className="car__description_block">
                        <CarTankViewer/>
                        <CarDescription/>
                    </div>
                </div>
                <div className="car__content car__second_content_block">
                    <h1 className="car__settings_caption">Настройки автомобиля</h1>
                    <div className="car__settings_block">
                        Блок с настройками автомобиля
                    </div>
                    <EditorControlBlock
                        handleSave={handleSaveButtonClick}
                        handleCancel={handleCancelButtonClick}
                        handleRemove={handleRemoveButtonClick}
                    />
                </div>
            </div>
            }
        </div>
    );
}

export default Car;