import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch, useHistory, useLocation} from 'react-router-dom';
import {useGlobalPreloader} from '../../../../../store/hooks';
import {loadOrder, removeOrder, saveOrder, setPopupMessage} from '../../../../../store/actionCreators';
import StatusBlock from '../StatusBlock/StatusBlock';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import {getOrderStatus} from '../../../../../store/selectors';
import {ADMIN_APP_URL, ORDER_LIST_APP_URL} from '../../../../../constants/urls';
import './Order.scss';

function Order() {
    const [done, setDone] = useState(false);
    const [error, setError] = useState(null);
    const [showPreloader, hidePreloader] = useGlobalPreloader();

    const dispatch = useDispatch();

    const orderStatus = useSelector(getOrderStatus);
    const [hasStatusChange, setHasStatusChange] = useState(false);

    const location = useLocation();
    const {params: {orderId}} = useRouteMatch();
    const history = useHistory();

    // При монтировании определяем id заказа из URL и пытаемся загрузить его
    useEffect(() => {
        if (!orderId) return;
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

    // Блок обработчиков кликов
    const toOrderList = () => history.push(`/${ADMIN_APP_URL}/${ORDER_LIST_APP_URL}`);

    const handleSaveButtonClick = () => {
        // Проверяем, внесены ли изменения, которые можно было бы сохранить
        if (!hasStatusChange) {
            dispatch(setPopupMessage('Внесите изменения для сохранения'));
            return;
        }

        // Формируем данные для сохранения
        let orderData = {};
        if (hasStatusChange) orderData = {...orderData, orderStatusId: orderStatus};

        // Пытаемся сохранить данные
        showPreloader();
        setError(null);
        dispatch(saveOrder(orderId, orderData))
            .then(() => {
                dispatch(setPopupMessage('Заказ успешно сохранен'));
                setHasStatusChange(false);
            })
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
                dispatch(setPopupMessage('Заказ успешно удален'));
                history.push(`/${ADMIN_APP_URL}`);
            })
            .catch(err => {
                setError(err);
                setDone(true);
            })
            .finally(() => hidePreloader());
    }

    // Если не удалось определить номер заказа, то показываем заглушку со ссылкой для перехода к списку заказов
    if (!orderId) return (
        <div className="order">
            <div className="order__content order__no_order_id">
                <h1>Выберите заказ для редактирования на странице списка заказов</h1>
                <button className="button button_green" onClick={toOrderList}>
                    Перейти к списку заказов
                </button>
            </div>
        </div>
    );

    if (error) return <ErrorPane error={error}/>;

    return (
        <div className="order">
            <h1 className="order__caption">Заказ №{orderId}</h1>
            {done &&
            <div className="order__content">
                <StatusBlock setStatusChangeFlag={() => setHasStatusChange(true)}/>
                <div className="order__control_block">
                    <button className="button button_blue" onClick={handleSaveButtonClick}>Сохранить</button>
                    <button className="button button_silver" onClick={handleCancelButtonClick}>Отменить</button>
                    <button className="button button_red" onClick={handleRemoveButtonClick}>Удалить</button>
                </div>
            </div>
            }
        </div>
    );
}

export default Order;