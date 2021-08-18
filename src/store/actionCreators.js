import * as act from './actions';

// Создатель действия для сохранения данных пунктов меню
export function setMenuItems(menuItems){
    return {
        type: act.SET_MENU_ITEMS,
        menuItems
    }
}