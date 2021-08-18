import * as act from './actions'

export function menuItems(state = [], action) {
    switch (action.type) {
        case act.SET_MENU_ITEMS:
            return action.menuItems;
        default:
            return state;
    }
}