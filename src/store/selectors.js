export const getMenuItems = state => state.menuItems;

export const getFrame = state => state.frame;

export const getCatalog = catalogName => state => state.catalog[catalogName];

export const getUsername = state => state.username;

export const getError = state => state.error;

export const getPreloader = state => state.preloader;

export const getPopupMessage = state => state.popupMessage;

export const getEntity = state => state.entity;

export const getOrderStatus = state => state.entity.orderStatusId;

export const getOrderCity = state => state.entity.cityId;

export const getOrderPoint = state => state.entity.pointId;

export const getOrderRate = state => state.entity.rateId;

export const getOrderTank = state => state.entity.isFullTank;

export const getOrderChair = state => state.entity.isNeedChildChair;

export const getOrderWheel = state => state.entity.isRightWheel;

export const getOrderDateFrom = state => state.entity.dateFrom;

export const getOrderDateTo = state => state.entity.dateTo;

export const getOrderPrice = state => state.entity.price;

export const getOrderCar = state => state.entity.carId;

export const getOrderColor = state => state.entity.color;

export const getCarId = state => state.entity.id;

export const getCarThumbnail = state => state.entity.thumbnail;

export const getCarName = state => state.entity.name;

export const gedCarDescription = state => state.entity.description;

export const getCarCategory = state => state.entity.categoryId;

export const getPriceMin = state => state.entity.priceMin;

export const getPriceMax = state => state.entity.priceMax;

export const getCarTank = state => state.entity.tank;

export const getCarNumber = state => state.entity.number;