import React, {useEffect} from 'react';
import {ADMIN_APP_URL, POINT_LIST_APP_URL} from '../../../../../constants/urls';
import {
    CATEGORY_FILTER_NAME,
    PAGE_FILTER_NAME,
    PRICE_MAX_FILTER_NAME,
    PRICE_MIN_FILTER_NAME,
    TANK_FILTER_NAME
} from '../../../../../constants/settings';
import './PointList.scss';

function PointList(){

    useEffect(() => {
        // Предотвращаем выполнение ненужных действий, если компонент размонтирован
        if (!location.pathname.startsWith(`/${ADMIN_APP_URL}/${POINT_LIST_APP_URL}`)) return;

        showGlobalPreloader();
        setError(null);
        setDone(false);
        dispatch(loadCarList(page, categoryId, priceMin, priceMax, tank))
            .catch(err => setError(err))
            .finally(() => {
                hideGlobalPreloader();
                setDone(true);
            });
    }, [location])

    return (
        <div className="point_list">
            <h1 className="point_list__caption">Пункты выдачи</h1>
        </div>
    )
}

export default PointList;