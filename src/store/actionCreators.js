import * as act from './actions';
import {
    fetchOrderList,
    fetchStatusList,
    fetchCarList,
    fetchCityList,
    fetchCarCategoryList,
    fetchPointList,
    fetchOrder,
    removeOrderInBase,
    updateOrderInBase,
    fetchRateList,
    fetchCar,
    saveCarInBase,
    removeCarInBase,
    fetchPoint,
    removePointInBase,
    savePointInBase
} from '../utils/fetch_utils';
import {
    STATUS_LIST_CATALOG,
    CAR_LIST_CATALOG,
    CITY_LIST_CATALOG,
    CAR_CATEGORY_CATALOG,
    POINT_LIST_CATALOG,
    RATE_LIST_CATALOG
} from '../constants/settings';

// Вспомогательная функция возвращающая корректный номер страницы
function getCorrectPage(page) {
    let _page = (page === null || page === undefined) ? 0 : +page;
    if (isNaN(_page)) _page = 0;
    return _page
}

// Вспомогательная функция для загрузки каталогов
async function loadCatalogs(dispatch, getState, catalogs) {
    const loaderSelector = {
        [STATUS_LIST_CATALOG]: fetchStatusList,
        [CAR_LIST_CATALOG]: fetchCarList,
        [POINT_LIST_CATALOG]: fetchPointList,
        [CITY_LIST_CATALOG]: fetchCityList,
        [CAR_CATEGORY_CATALOG]: fetchCarCategoryList,
        [RATE_LIST_CATALOG]: fetchRateList
    }
    for (const catalog of catalogs) {
        if (!getState().catalog[catalog]) {
            const {data} = await loaderSelector[catalog]();
            dispatch(setCatalog(catalog, data));
        }
    }
}

// Создатель действия для сохранения данных пунктов меню
export function setMenuItems(menuItems) {
    return {
        type: act.SET_MENU_ITEMS,
        menuItems
    }
}

// Создатель действия для установки кадра данных
export function setFrame(frame) {
    return {
        type: act.SET_FRAME,
        frame
    }
}

// Создатель действия для установки каталога
export function setCatalog(catalogName, catalogData) {
    return {
        type: act.SET_CATALOG,
        catalogName,
        catalogData
    }
}

// Создатель действия для сохранения полученного от бэка имени пользователя
export function setUsername(username) {
    return {
        type: act.SET_USERNAME,
        username
    }
}

// Создатель действия для сохранения сведений об ошибке
export function setError(error) {
    return {
        type: act.SET_ERROR,
        error
    }
}

// Создатель действия для управления флагом глобального прелоадера
export function setPreloader(preloader) {
    return {
        type: act.SET_PRELOADER,
        preloader
    }
}

// Создатель действия для загрузки списка заказов
export function loadOrderList(page, date, car, city, status) {
    return async (dispatch, getState) => {
        // Загружаем список заказов
        const _page = getCorrectPage(page);
        const orderList = await fetchOrderList(_page, date, car, city, status);
        dispatch(setFrame({count: orderList.count, data: orderList.data, page: _page}));

        // Загружаем необходимые каталоги
        await loadCatalogs(dispatch, getState, [STATUS_LIST_CATALOG, CAR_LIST_CATALOG, CITY_LIST_CATALOG]);
    }
}

// Создатель действия для загрузки списка автомобилей
export function loadCarList(page, categoryId, priceMin, priceMax, tank) {
    return async (dispatch, getState) => {
        // Загружаем список автомобилей
        const _page = getCorrectPage(page);
        const carList = await fetchCarList(_page, categoryId, priceMin, priceMax, tank);
        dispatch(setFrame({count: carList.count, data: carList.data, page: _page}));

        // Загружаем справочник с категориями авто
        await loadCatalogs(dispatch, getState, [CAR_CATEGORY_CATALOG]);
    }
}

// Создатель действия для загрузки списка пунктов выдачи
export function loadPointList(page, cityId) {
    return async (dispatch, getState) => {
        const _page = getCorrectPage(page);
        const pointList = await fetchPointList(_page, cityId);
        dispatch(setFrame({count: pointList.count, data: pointList.data, page: _page}));

        // Загружаем список городов, если он еще не был загружен
        await loadCatalogs(dispatch, getState, [CITY_LIST_CATALOG]);
    }
}

// Создатель действия для инициализации сущности переданным объектом
export function setEntity(entity) {
    return {
        type: act.SET_ENTITY,
        entity
    }
}

// Создатель действия для установки значения поля сущности
export function setEntityField(field, value) {
    return {
        type: act.SET_ENTITY_FIELD,
        field,
        value
    }
}

// Создатель действия для установки всплывающего сообщения
export function setPopupMessage(status, text) {
    return {
        type: act.SET_POPUP_MESSAGE,
        message: {status, text}
    }
}

// Создатель действия для загрузки заказа
export function loadOrder(orderId) {
    return async (dispatch, getState) => {
        const order = await fetchOrder(orderId);
        dispatch(setEntity(order.data));

        // Загружаем необходимые каталоги
        await loadCatalogs(
            dispatch,
            getState,
            [STATUS_LIST_CATALOG, CITY_LIST_CATALOG, POINT_LIST_CATALOG, RATE_LIST_CATALOG, CAR_LIST_CATALOG]
        );
    }
}

// Создатель действия для удаления заказа
export function removeOrder(orderId) {
    return async dispatch => {
        await removeOrderInBase(orderId);
        dispatch(setEntity({}));
    }
}

// Создатель действия для сохранения заказа
export function updateOrder(order) {
    return async dispatch => {
        const updatedOrder = await updateOrderInBase(order);
        dispatch(setEntity(updatedOrder.data));
    }
}

// Создатель действия для инициализации в хранилище нового автомобиля
export function initNewCar() {
    return async (dispatch, getState) => {
        dispatch(setEntity({
            name: '',
            description: '',
            priceMin: 0,
            priceMax: 0,
            number: '',
            tank: 0,
            colors: []
        }));

        // Загружаем необходимые каталоги
        await loadCatalogs(dispatch, getState, [CAR_CATEGORY_CATALOG]);
    }
}

// Создатель действия для загрузки автомобиля
export function loadCar(carId) {
    return async (dispatch, getState) => {
        const car = await fetchCar(carId);
        dispatch(setEntity(car.data));

        // Загружаем необходимые каталоги
        await loadCatalogs(dispatch, getState, [CAR_CATEGORY_CATALOG]);
    }
}

// Создатель действия для удаления автомобиля
export function removeCar(carId) {
    return async dispatch => {
        await removeCarInBase(carId);
        dispatch(setEntity({}));
    }
}

// Создатель действия для сохранения автомобиля
export function saveCar(car) {
    return async dispatch => {
        const savedCar = await saveCarInBase(car);
        dispatch(setEntity(savedCar.data));

        return savedCar.data.id;
    }
}

// Создатель действия для инициализации в хранилище нового пункта выдачи
export function initNewPoint() {
    return async (dispatch, getState) => {
        dispatch(setEntity({
            name: '',
            address: ''
        }));

        // Загружаем необходимые каталоги
        await loadCatalogs(dispatch, getState, [CITY_LIST_CATALOG]);
    }
}

// Создатель действия для загрузки пункта выдачи
export function loadPoint(pointId) {
    return async (dispatch, getState) => {
        const point = await fetchPoint(pointId);
        dispatch(setEntity(point.data));

        // Загружаем необходимые каталоги
        await loadCatalogs(dispatch, getState, [CITY_LIST_CATALOG]);
    }
}

// Создатель действия для удаления пункта выдачи
export function removePoint(pointId) {
    return async dispatch => {
        await removePointInBase(pointId);
        dispatch(setEntity({}));
    }
}

// Создатель действия для сохранения пункта выдачи
export function savePoint(point) {
    return async dispatch => {
        const savedPoint = await savePointInBase(point);
        dispatch(setEntity(savedPoint.data));

        return savedPoint.data.id;
    }
}