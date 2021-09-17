import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch, useHistory, useLocation} from 'react-router-dom';
import {useGlobalPreloader} from '../../../../../store/hooks';
import {loadOrder, removeOrder, updateOrder, setPopupMessage} from '../../../../../store/actionCreators';
import PlaceBlock from '../PlaceBlock/PlaceBlock';
import CarBlock from '../CarBlock/CarBlock';
import OptionBlock from '../OptionBlock/OptionBlock';
import DateBlock from '../DateBlock/DateBlock';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import EditorControlBlock from '../../../../common/EditorControlBlock/EditorControlBlock';
import CatalogSelector from '../../../../common/CatalogSelector/CatalogSelector';
import TextValueEditor from '../../../../common/TextValueEditor/TextValueEditor';
import {getEntity, getOrderStatus, getOrderRate, getOrderPrice} from '../../../../../store/selectors';
import {isWholePositiveOrZero} from '../../../../../utils/common_utils';
import {ADMIN_APP_URL} from '../../../../../constants/urls';
import {RATE_LIST_CATALOG, STATUS_LIST_CATALOG, SUCCESS} from '../../../../../constants/settings';
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
    const {params: {id}} = useRouteMatch();
    const history = useHistory();

    const rateNameExtractor = rate => `${rate.rateTypeId.name} (${rate.price}р./${rate.rateTypeId.unit})`

    // При монтировании пытаемся загрузить заказ
    useEffect(() => {
        showPreloader();
        setDone(false);
        setError(null);
        dispatch(loadOrder(id))
            .catch(err => setError(err))
            .finally(() => {
                setDone(true);
                hidePreloader();
            });
    }, [location, id]);

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
        const priceError = (order.price !== null && order.price !== undefined) && !isWholePositiveOrZero(order.price);
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
        dispatch(removeOrder(id))
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
            <h1 className="order__caption">Заказ №{id}</h1>
            {done &&
            <div className="order__content">
                <div className="order__settings_block">
                    <CatalogSelector
                        label="Статус заказа"
                        catalogName={STATUS_LIST_CATALOG}
                        entityField="orderStatusId"
                        fieldGetter={getOrderStatus}
                        errorText={statusErrorText}
                        resetErrorText={resetStatusErrorText}
                    />
                    <PlaceBlock
                        cityErrorText={cityErrorText}
                        pointErrorText={pointErrorText}
                        resetCityErrorText={resetCityErrorText}
                        resetPointErrorText={resetPointErrorText}
                    />
                    <CarBlock/>
                    <DateBlock/>
                    <CatalogSelector
                        label="Тариф"
                        catalogName={RATE_LIST_CATALOG}
                        entityField="rateId"
                        fieldGetter={getOrderRate}
                        nameExtractor={rateNameExtractor}
                        enableEmpty
                    />
                    <OptionBlock/>
                    <TextValueEditor
                        label="Цена"
                        getValue={getOrderPrice}
                        entityField="price"
                        errorText={priceErrorText}
                        resetErrorText={resetPriceErrorText}
                        setNullIfEmpty
                    />
                </div>
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