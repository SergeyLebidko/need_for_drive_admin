export const getMenuItems = state => state.menuItems;

export const getFrame = state => state.frame;

export const getCatalog = catalogName => state => state.catalog[catalogName];

export const getUsername = state => state.username;

export const getError = state => state.error;

export const getPreloader = state => state.preloader;

export const getOrderStatus = state => state.entity.orderStatusId;