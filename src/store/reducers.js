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

export function error(state = null, action) {
    switch (action.type) {
        case act.SET_ERROR:
            return action.error;
        default:
            return state;
    }
}

export function preloader(state = false, action) {
    switch (action.type) {
        case act.SET_PRELOADER:
            return action.preloader;
        default:
            return state;
    }
}

export function entity(state = {}, action) {
    switch (action.type) {
        case act.SET_ENTITY:
            return action.entity
        case act.SET_ENTITY_FIELD:
            return {...state, [action.field]: action.value}
        default:
            return state;
    }
}

export function popupMessage(state = null, action) {
    switch (action.type) {
        case act.SET_POPUP_MESSAGE:
            return action.message;
        default:
            return state;
    }
}