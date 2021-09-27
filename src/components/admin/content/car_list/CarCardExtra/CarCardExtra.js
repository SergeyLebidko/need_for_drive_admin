import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {capitalize} from '../../../../../utils/common_utils';
import ListElementControl from '../../../../common/ListElementControl/ListElementControl';
import LineIndicator from '../../../../common/LineIndicator/LineIndicator';
import {ADMIN_APP_URL, CAR_EDIT_APP_URL} from '../../../../../constants/urls';
import './CarCardExtra.scss';

function CarCardExtra({car}) {
    const history = useHistory();
    const toCarEditor = () => history.push(`/${ADMIN_APP_URL}/${CAR_EDIT_APP_URL}/${car.id}`);

    const getCategoryDescription = useCallback(
        () => car.categoryId ? `${car.categoryId.name} (${car.categoryId.description})` : 'не указана',
        [car]
    );
    const getColors = useCallback(
        () => car.colors && car.colors.length > 0 ? car.colors.map(color => capitalize(color)) : ['не указаны'],
        [car]
    );
    const getDescription = useCallback(() => car.description || 'не указано', [car]);
    const getCarTank = useCallback(() => car.tank ? `${car.tank}%` : 'не указан', [car]);

    return (
        <div className="car_card_extra">
            <header className="car_card_extra__name">{car.name}</header>
            <main className="car_card_extra__content">
                <section>
                    <article>
                        <span className="car_card_extra__normal_text">Категория: </span>
                        <span className="car_card_extra__strong_text">
                            {getCategoryDescription()}
                        </span>
                    </article>
                    <article>
                        <span className="car_card_extra__normal_text">Описание: </span>
                        <span className="car_card_extra__strong_text">{getDescription()}</span>
                    </article>
                    <article>
                        <span className="car_card_extra__normal_text">Гос. номер: </span>
                        {(car.number && car.number !== 'undefined') ?
                            <span className="car_card_extra__number">
                                 {car.number}
                            </span>
                            :
                            <span className="car_card_extra__strong_text">
                                не указан
                            </span>
                        }
                    </article>
                </section>
                <section>
                    <article>
                        <span className="car_card_extra__normal_text">Цена: </span>
                        <span className="car_card_extra__strong_text">от {car.priceMin} до {car.priceMax}&#8381;</span>
                    </article>
                    <article>
                        <span className="car_card_extra__normal_text">Уровень топлива:</span>
                        <span className="car_card_extra__strong_text"> {getCarTank()}</span>
                        {(car.tank >= 0 && car.tank <= 100) && <LineIndicator value={car.tank}/>}
                    </article>
                    <article>
                        <span className="car_card_extra__normal_text">Доступные цвета:</span>
                        <ul>
                            {getColors().map(
                                color =>
                                    <li key={color}>
                                        <span className="car_card_extra__strong_text">{capitalize(color)}</span>
                                    </li>
                            )}
                        </ul>
                    </article>
                </section>
                <ListElementControl handleButtonClick={toCarEditor}/>
            </main>
        </div>
    );
}

CarCardExtra.propTypes = {
    car: PropTypes.object
}

export default CarCardExtra;