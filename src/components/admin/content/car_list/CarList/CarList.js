import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Paginator from '../../../../common/Paginator/Paginator';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import CarCard from '../CarCard/CarCard';
import {ADMIN_APP_URL, CAR_LIST_APP_URL} from '../../../../../constants/urls';
import {
    CATEGORY_FILTER_NAME,
    PAGE_FILTER_NAME,
    PRICE_MAX_FILTER_NAME,
    PRICE_MIN_FILTER_NAME, TANK_FILTER_NAME
} from '../../../../../constants/settings';
import {loadCarList} from '../../../../../store/actionCreators';
import {getFrame} from '../../../../../store/selectors';
import {useGlobalPreloader} from '../../../../../store/hooks';
import './CarList.scss';
import CarFilters from "../CarFilters/CarFilters";

function CarList() {
    const [done, setDone] = useState(false);
    const [error, setError] = useState(null);

    const frame = useSelector(getFrame);
    let items;
    if (frame) items = frame.data;

    const location = useLocation();
    const dispatch = useDispatch();

    const [showGlobalPreloader, hideGlobalPreloader] = useGlobalPreloader();

    useEffect(() => {
        // Предотвращаем выполнение ненужных действий, если компонент размонтирован
        if (!location.pathname.startsWith(`/${ADMIN_APP_URL}/${CAR_LIST_APP_URL}`)) return;

        const params = new URLSearchParams(location.search);
        const page = params.get(PAGE_FILTER_NAME);
        const categoryId = params.get(CATEGORY_FILTER_NAME);
        const priceMin = params.get(PRICE_MIN_FILTER_NAME);
        const priceMax = params.get(PRICE_MAX_FILTER_NAME);
        const tank = params.get(TANK_FILTER_NAME);

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

    if (error) return <ErrorPane error={error}/>;

    return (
        <div className="car_list">
            <h1 className="car_list__caption">Автомобили</h1>
            {done &&
            <>
                <div className="car_list__content">
                    <CarFilters/>
                    {items && items.length > 0 &&
                    <>
                        <ul>
                            {items.map(item => <CarCard key={item.id} car={item}/>)}
                        </ul>
                        <Paginator/>
                    </>
                    }
                </div>
            </>
            }
        </div>
    );
}

export default CarList;