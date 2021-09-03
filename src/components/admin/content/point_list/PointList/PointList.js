import React from 'react';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import Paginator from '../../../../common/Paginator/Paginator';
import PointFilters from '../PointFilters/PointFilters';
import PointCard from '../PointCard/PointCard';
import {useListLoader} from '../../../../../store/hooks';
import {loadPointList} from '../../../../../store/actionCreators';
import {CITY_FILTER_NAME} from '../../../../../constants/settings';
import {POINT_LIST_APP_URL} from '../../../../../constants/urls';
import './PointList.scss';

function PointList() {
    const [done, error, items] = useListLoader(POINT_LIST_APP_URL, [CITY_FILTER_NAME], loadPointList);

    if (error) return <ErrorPane error={error}/>;

    return (
        <div className="point_list">
            <h1 className="point_list__caption">Пункты выдачи</h1>
            {done &&
            <div className="point_list__content">
                <PointFilters/>
                {items && items.length > 0 &&
                <>
                    <ul className="point_list__title_block">
                        <li className="point_list__city_title">Город</li>
                        <li className="point_list__address_title">Адрес</li>
                        <li className="point_list__name_title">Название</li>
                        <li className="point_list__control_title"/>
                    </ul>
                    <ul>
                        {items.map(item => <PointCard key={item.id} point={item}/>)}
                    </ul>
                    <Paginator/>
                </>
                }
            </div>
            }
        </div>
    )
}

export default PointList;