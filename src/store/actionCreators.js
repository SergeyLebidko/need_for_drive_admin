import * as act from './actions';
import {fetchOrderList, fetchStatusList, fetchCarList, fetchCityList} from '../utils/fetch_utils';
import {STATUS_LIST_CATALOG, CAR_LIST_CATALOG, CITY_LIST_CATALOG} from '../settings';

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

// Создатель действия для загрузки списка заказов
export function loadOrderList(page) {
    return async (dispatch, getState) => {
        // Загружаем список заказов
        const _page = getCorrectPage(page);
        const orderList = await fetchOrderList(_page);
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