import React from 'react';
import {ReactComponent as OrderListIcon} from '../content/images/order_list_icon.svg';

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

// Список пунктов главного меню
export const MENU_ITEMS = [
    {
        title: 'Заказы',
        iconComponent: <OrderListIcon/>,
        href: 'orders'
    }
];

// Наборы символов
export const LETTER_CHARS = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
export const DIGIT_CHARS = '0123456789';
export const ALL_CHARS = LETTER_CHARS + DIGIT_CHARS + '_';

// Рекомендуемый размер пароля
export const PASSWORD_SIZE = 10;

// Параметры "соли"
export const SALT = 'salt';
export const SALT_SIZE = 7;

// Наименования cookie для токенов
export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';