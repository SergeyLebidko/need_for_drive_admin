import React from 'react';
import {ReactComponent as CarListIcon} from './content/images/car_list_icon.svg';
import {ReactComponent as OrderListIcon} from './content/images/order_list_icon.svg';
import {ReactComponent as MenuItemIcon} from './content/images/menu_item_icon.svg';

// Размер страницы данных
export const LIMIT = 10;

// Имена каталогов со справочной информацией
export const STATUS_LIST_CATALOG = 'status_list_catalog';
export const CAR_LIST_CATALOG = 'car_list_catalog';
export const CITY_LIST_CATALOG = 'city_list_catalog';

// Пресеты (значения) для фильтров по времени
export const NO_FILTER_VALUE = 'no_filter_value';
export const PER_DAY = 'per_day';
export const PER_WEEK = 'per_week';
export const PER_MONTH = 'per_month';
export const BEGIN_DAY = 'begin_day';
export const BEGIN_WEEK = 'begin_week';
export const BEGIN_MONTH = 'begin_month';

// Названия фильтров
export const LIMIT_FILTER_NAME = 'limit';
export const PAGE_FILTER_NAME = 'page';
export const DATE_FROM_FILTER_NAME = 'dateFrom';
export const CAR_FILTER_NAME = 'carId';
export const CITY_FILTER_NAME = 'cityId';
export const STATUS_FILTER_NAME = 'orderStatusId';

// TODO При реализации функциональности дополнить список пунктами меню для переходов на уже реализованные компоненты
export const MENU_ITEMS = [
    {
        title: 'Заказы',
        iconComponent: <OrderListIcon/>,
        href: 'orders'
    },
    {
        title: 'Автомобили',
        iconComponent: <CarListIcon/>,
        href: 'cars'
    },
    {
        title: 'Элемент 3',
        iconComponent: <MenuItemIcon/>,
        href: 'element3'
    },
    {
        title: 'Элемент 4',
        iconComponent: <MenuItemIcon/>,
        href: 'element4'
    },
    {
        title: 'Элемент 5',
        iconComponent: <MenuItemIcon/>,
        href: 'element5'
    },
    {
        title: 'Элемент 6',
        iconComponent: <MenuItemIcon/>,
        href: 'element6'
    },
    {
        title: 'Элемент 7',
        iconComponent: <MenuItemIcon/>,
        href: 'element7'
    },
    {
        title: 'Элемент 8',
        iconComponent: <MenuItemIcon/>,
        href: 'element8'
    },
    {
        title: 'Элемент 9',
        iconComponent: <MenuItemIcon/>,
        href: 'element9'
    },
    {
        title: 'Пример ошибки',
        iconComponent: <MenuItemIcon/>,
        href: 'error'
    }
];