import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import {useGlobalPreloader} from '../../../../../store/hooks';
import {loadCar, setEntity} from '../../../../../store/actionCreators';
import {ADMIN_APP_URL, CAR_LIST_APP_URL} from '../../../../../constants/urls';
import './Car.scss';

function Car() {
    const [done, setDone] = useState(false);
    const [error, setError] = useState(null);
    const [showPreloader, hidePreloader] = useGlobalPreloader();

    const location = useLocation();
    const {params: {carId}} = useRouteMatch();
    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        setDone(false);
        setError(null);

        // Если идентификатор автомобиля не указан в URL, то считаем, что это форма создания автомобиля
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

    // Блок обработчиков кликов
    const handleCancelButtonClick = () => {
        if (carId) {
            history.push(`/${ADMIN_APP_URL}/${CAR_LIST_APP_URL}`);
            return
        }
        history.push(`/${ADMIN_APP_URL}`);
    }

    if (error) return <ErrorPane error={error}/>;

    return (
        <div className="car">
            <h1 className="car__caption">Карточка автомобиля</h1>
            {done &&
            <div className="car__content_wrapper">
                <div className="car__content car__first_content_block">
                    Фото
                </div>
                <div className="car__content car__second_content_block">
                    Параметры
                    <div className="car__control_block">
                        <button className="button button_blue">Сохранить</button>
                        <button className="button button_silver" onClick={handleCancelButtonClick}>Отменить</button>
                        <button className="button button_red">Удалить</button>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default Car;