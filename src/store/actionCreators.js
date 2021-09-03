import * as act from './actions';
import {
    fetchOrderList,
    fetchStatusList,
    fetchCarList,
    fetchCityList,
    fetchCarCategoryList,
    fetchPointList
} from '../utils/fetch_utils';
import {STATUS_LIST_CATALOG, CAR_LIST_CATALOG, CITY_LIST_CATALOG, CAR_CATEGORY_CATALOG} from '../constants/settings';

// Функция возвращает корректный номер страницы
function getCorrectPage(page) {
    let _page = (page === null || page === undefined) ? 0 : +page;
    if (isNaN(_page)) _page = 0;
    return _page
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


        // Загружаем справочник со статусами заказов, если он еще не был загружен
        if (!getState().catalog[STATUS_LIST_CATALOG]) {
            const statusList = await fetchStatusList();
            dispatch(setCatalog(STATUS_LIST_CATALOG, statusList.data));
        }

        // Загружаем список авто (как справочник моделей), если он еще не был загружен
        if (!getState().catalog[CAR_LIST_CATALOG]) {
            const carList = await fetchCarList();
            dispatch(setCatalog(CAR_LIST_CATALOG, carList.data));
        }

        // Загружаем список городов, если он еще не был загружен
        if (!getState().catalog[CITY_LIST_CATALOG]) {
            const cityList = await fetchCityList();
            dispatch(setCatalog(CITY_LIST_CATALOG, cityList.data));
        }
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
        if (!getState().catalog[CAR_CATEGORY_CATALOG]) {
            const carCategoryList = await fetchCarCategoryList();
            dispatch(setCatalog(CAR_CATEGORY_CATALOG, carCategoryList.data));
        }
    }
}

// Создатель действия для загрузки списка пунктов выдачи
export function loadPointList(page){
    return async (dispatch, getState) => {
        const _page = getCorrectPage(page);
        const pointList = await fetchPointList(_page);
        dispatch(setFrame({count: pointList.count, data: pointList.data, page: _page}));

        // Загружаем список городов, если он еще не был загружен
        if (!getState().catalog[CITY_LIST_CATALOG]) {
            const cityList = await fetchCityList();
            dispatch(setCatalog(CITY_LIST_CATALOG, cityList.data));
        }
    }
}

// Создатель действия для загрузки каталогов
export function loadCatalogs(catalogs){
    return async (dispatch, getState) => {
        const loaderSelector = {
            [STATUS_LIST_CATALOG]: fetchStatusList,
            [CAR_LIST_CATALOG]: fetchCarList,
            [CITY_LIST_CATALOG]: fetchCityList,
            [CAR_CATEGORY_CATALOG]: fetchCarCategoryList
        }
        for (const catalog of catalogs){
            if (!getState().catalog[catalog]){
                const {data} = await loaderSelector[catalog]();
                dispatch(setCatalog(catalog, data));
            }
        }
    }
}