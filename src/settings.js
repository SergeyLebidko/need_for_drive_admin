import React from 'react';
import {ReactComponent as CarListIcon} from './content/images/car_list_icon.svg';
import {ReactComponent as OrderListIcon} from './content/images/order_list_icon.svg';
import {ReactComponent as MenuItemIcon} from './content/images/menu_item_icon.svg';

// Размер страницы данных
export const LIMIT = 10;

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