import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch, useHistory, useLocation} from 'react-router-dom';
import {useGlobalPreloader} from '../../../../../store/hooks';
import {loadOrder, removeOrder, updateOrder, setPopupMessage} from '../../../../../store/actionCreators';
import StatusBlock from '../StatusBlock/StatusBlock';
import PlaceBlock from '../PlaceBlock/PlaceBlock';
import CarBlock from '../CarBlock/CarBlock';
import RateBlock from '../RateBlock/RateBlock';
import OptionBlock from '../OptionBlock/OptionBlock';
import DateBlock from '../DateBlock/DateBlock';
import PriceBlock from '../PriceBlock/PriceBlock';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import EditorControlBlock from '../../../../common/EditorControlBlock/EditorControlBlock';
import {getEntity} from '../../../../../store/selectors';
import {isWholePositiveOrZero} from '../../../../../utils/common_utils';
import {ADMIN_APP_URL} from '../../../../../constants/urls';
import {SUCCESS} from '../../../../../constants/settings';
import './Order.scss';

function Order() {
    const [done, setDone] = useState(false);
    const [error, setError] = useState(null);
    const [showPreloader, hidePreloader] = useGlobalPreloader();

    const dispatch = useDispatch();
    const order = useSelector(getEntity);

    const [statusErrorText, setStatusErrorText] = useState(null);
    const [cityErrorText, setCityErrorText] = useState(null);
    const [pointErrorText, setPointErrorText] = useState(null);
    const [priceErrorText, setPriceErrorText] = useState(null);

    const location = useLocation();
    const {params: {orderId}} = useRouteMatch();
    const history = useHistory();

    // При монтировании пытаемся загрузить заказ
    useEffect(() => {
        showPreloader();
        setDone(false);
        setError(null);
        dispatch(loadOrder(orderId))
            .catch(err => setError(err))
            .finally(() => {
                setDone(true);
                hidePreloader();
            });
    }, [location, orderId]);

    // Блок функций сброса ошибок
    const resetStatusErrorText = () => setStatusErrorText(null);
    const resetCityErrorText = () => setCityErrorText(null);
    const resetPointErrorText = () => setPointErrorText(null);
    const resetPriceErrorText = () => setPriceErrorText(null);

    // Блок обработчиков кликов
    const handleSaveButtonClick = () => {
        // Перед попыткой сохранения проверяем заполнение обязательных полей. Без их указания - бэк не даст выполнить сохранение
        if (!order.orderStatusId) setStatusErrorText('Выберите статус заказа');
        if (!order.cityId) setCityErrorText('Выберите город');
        if (!order.pointId) setPointErrorText('Выберите пункт выдачи');

        // Проверяем корректность указания цены
        const priceError = !order.price || !isWholePositiveOrZero(order.price);
        if (priceError) setPriceErrorText('Введите корректное значение цены');

        if (!order.orderStatusId || !order.cityId || !order.pointId || priceError) return;

        // Пытаемся выполнить сохранение
        showPreloader();
        setError(null);
        dispatch(updateOrder(order))
            .then(() => dispatch(setPopupMessage(SUCCESS, 'Заказ успешно сохранен')))
            .catch(err => setError(err))
            .finally(() => hidePreloader());
    }

    const handleCancelButtonClick = () => history.goBack();

    const handleRemoveButtonClick = () => {
        showPreloader();
        setDone(false);
        setError(null);
        dispatch(removeOrder(orderId))
            .then(() => {
                dispatch(setPopupMessage(SUCCESS, 'Заказ успешно удален'));
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
        <div className="order">
            <h1 className="order__caption">Заказ №{orderId}</h1>
            {done &&
            <div className="order__content">
                <StatusBlock errorText={statusErrorText} resetErrorText={resetStatusErrorText}/>
                <PlaceBlock
                    cityErrorText={cityErrorText}
                    pointErrorText={pointErrorText}
                    resetCityErrorText={resetCityErrorText}
                    resetPointErrorText={resetPointErrorText}
                />
                <CarBlock/>
                <DateBlock/>
                <RateBlock/>
                <OptionBlock/>
                <PriceBlock errorText={priceErrorText} resetErrorText={resetPriceErrorText}/>
                <EditorControlBlock
                    handleCancel={handleCancelButtonClick}
                    handleSave={handleSaveButtonClick}
                    handleRemove={handleRemoveButtonClick}
                />
            </div>
            }
        </div>
    );
}

export default Order;