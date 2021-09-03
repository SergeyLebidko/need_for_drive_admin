import React from 'react';
import Paginator from '../../../../common/Paginator/Paginator';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import CarFilters from '../CarFilters/CarFilters';
import CarCard from '../CarCard/CarCard';
import {CAR_LIST_APP_URL} from '../../../../../constants/urls';
import {
    CATEGORY_FILTER_NAME,
    PRICE_MAX_FILTER_NAME,
    PRICE_MIN_FILTER_NAME, TANK_FILTER_NAME
} from '../../../../../constants/settings';
import {loadCarList} from '../../../../../store/actionCreators';
import {useListLoader} from '../../../../../store/hooks';
import './CarList.scss';

function CarList() {
    const [done, error, items] = useListLoader(
        CAR_LIST_APP_URL,
        [CATEGORY_FILTER_NAME, PRICE_MIN_FILTER_NAME, PRICE_MAX_FILTER_NAME, TANK_FILTER_NAME],
        loadCarList
    );

    if (error) return <ErrorPane error={error}/>;

    return (
        <div className="car_list">
            <h1 className="car_list__caption">Автомобили</h1>
            {done &&
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
            }
        </div>
    );
}

export default CarList;