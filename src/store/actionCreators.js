import * as act from './actions';

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
export function loadOrderList(page){
    return async (dispatch, getState) => {

    }
}