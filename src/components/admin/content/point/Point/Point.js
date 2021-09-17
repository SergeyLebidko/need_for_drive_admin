import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import {useGlobalPreloader} from '../../../../../store/hooks';
import EditorControlBlock from '../../../../common/EditorControlBlock/EditorControlBlock';
import CatalogSelector from '../../../../common/CatalogSelector/CatalogSelector';
import TextValueEditor from '../../../../common/TextValueEditor/TextValueEditor';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import {initNewPoint, loadPoint, removePoint, savePoint, setPopupMessage} from '../../../../../store/actionCreators';
import {getEntity, getPointCity, getPointName, getPointAddress} from '../../../../../store/selectors';
import {CITY_LIST_CATALOG, FAIL, SUCCESS} from '../../../../../constants/settings';
import {ADMIN_APP_URL, POINT_EDIT_APP_URL, POINT_LIST_APP_URL} from '../../../../../constants/urls';
import './Point.scss';

function Point() {
    const [done, setDone] = useState(false);
    const [error, setError] = useState(null);
    const [showPreloader, hidePreloader] = useGlobalPreloader();

    const dispatch = useDispatch();
    const point = useSelector(getEntity);

    const [cityError, setCityError] = useState(null);
    const [addressError, setAddressError] = useState(null);
    const [pointNameError, setPointNameError] = useState(null);

    const location = useLocation();
    const {params: {pointId}} = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        setDone(false);
        setError(null);
        showPreloader();

        // Если идентификатор автомобиля не указан в URL, то инициализируем пустую новую сущность в хранилище
        let actionCreator, params;
        if (pointId) {
            actionCreator = loadPoint;
            params = [pointId];
        } else {
            actionCreator = initNewPoint;
            params = []
        }

        // Сбрасываем все ошибки полей ввода
        resetAllErrors();

        // Запускаем необходимое действие
        dispatch(actionCreator(...params))
            .catch(err => setError(err))
            .finally(() => {
                setDone(true);
                hidePreloader();
            });
    }, [location, pointId]);

    // Блок функций сброса ошибок
    const resetCityError = () => setCityError(null);
    const resetAddressError = () => setAddressError(null);
    const resetPointNameError = () => setPointNameError(null);

    const resetAllErrors = () => {
        resetCityError();
        resetAddressError();
        resetPointNameError();
    }

    // Блок обработчиков кликов
    const handleSaveButtonClick = () => {
        const {cityId, name, address} = point;
        if (!cityId) setCityError('Выберите город');
        if (!name) setPointNameError('Введите описание');
        if (!address) setAddressError('Введите адрес пункта выдачи');
        if (!cityId || !name || !address) return;

        // Пытаемся выполнить сохранение. Если сохраняли новый автомобиль, то переходим на страницу редактирования
        showPreloader();
        setError(null);
        dispatch(savePoint(point))
            .then(id => {
                dispatch(setPopupMessage(SUCCESS, 'Автомобиль успешно сохранен'));
                if (!pointId) history.push(`/${ADMIN_APP_URL}/${POINT_EDIT_APP_URL}/${id}`);
            })
            .catch(err => setError(err))
            .finally(() => hidePreloader());
    }

    const handleCancelButtonClick = () => {
        if (pointId) {
            history.push(`/${ADMIN_APP_URL}/${POINT_LIST_APP_URL}`);
            return
        }
        history.push(`/${ADMIN_APP_URL}`);
    }

    const handleRemoveButtonClick = () => {
        if (!pointId) {
            dispatch(setPopupMessage(FAIL, 'Нельзя удалить не сохраненный пункт выдачи'));
            return;
        }

        showPreloader();
        setDone(false);
        setError(null);
        dispatch(removePoint(pointId))
            .then(() => {
                dispatch(setPopupMessage(SUCCESS, 'Пункт выдачи успешно удален'));
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
        <div className="point">
            <h1 className="point__caption">Пункт выдачи</h1>
            {done &&
            <div className="point__content">
                    <CatalogSelector
                        label="Город"
                        catalogName={CITY_LIST_CATALOG}
                        entityField="cityId"
                        fieldGetter={getPointCity}
                        errorText={cityError}
                        resetErrorText={resetCityError}
                    />
                    <div className="point__place_settings">
                    <TextValueEditor
                        label="Название"
                        errorText={pointNameError}
                        resetErrorText={resetPointNameError}
                        getValue={getPointName}
                        entityField="name"
                    />
                    <TextValueEditor
                        label="Адрес"
                        errorText={addressError}
                        resetErrorText={resetAddressError}
                        getValue={getPointAddress}
                        entityField="address"
                    />
                    </div>
                <EditorControlBlock
                    handleSave={handleSaveButtonClick}
                    handleCancel={handleCancelButtonClick}
                    handleRemove={handleRemoveButtonClick}
                />
            </div>
            }
        </div>
    );
}

export default Point;