import * as act from './actions';
import {fetchOrderList} from '../utils/fetch_utils';

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

// Создатель действия для загрузки списка заказов
export function loadOrderList(page) {
    return async dispatch => {
        const _page = getCorrectPage(page);
        const {count, data} = await fetchOrderList();
        dispatch(setFrame({count, data, page: _page}));
    }
}