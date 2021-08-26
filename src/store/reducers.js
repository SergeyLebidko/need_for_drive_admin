import * as act from './actions'

export function menuItems(state = [], action) {
    switch (action.type) {
        case act.SET_MENU_ITEMS:
            return action.menuItems;
        default:
            return state;
    }
}

export function frame(state = null, action) {
    switch (action.type) {
        case act.SET_FRAME:
            return action.frame;
        default:
            return state;
    }
}

export function catalog(state = {}, action) {
    switch (action.type) {
        case act.SET_CATALOG:
            return {...state, [action.catalogName]: action.catalogData}
        default:
            return state;
    }
}

export function username(state = null, action) {
    switch (action.type) {
        case act.SET_USERNAME:
            return action.username;
        default:
            return state;
    }
}