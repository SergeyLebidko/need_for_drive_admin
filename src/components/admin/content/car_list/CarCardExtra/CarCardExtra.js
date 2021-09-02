import React from 'react';
import PropTypes from 'prop-types';
import {capitalize} from '../../../../../utils/common_utils';
import './CarCardExtra.scss';

import ListElementControl from "../../../../common/ListElementControl/ListElementControl";

function CarCardExtra({car}) {

    const getCategoryDescription = () => car.categoryId ? `${car.categoryId.name} (${car.categoryId.description})` : 'не указана';
    const getDescription = () => car.description || 'не указано';
    const getCarTank = () => car.tank ? `${car.tank}%` : 'не указан';
    const getColors = () => car.colors && car.colors.length > 0 ? car.colors.map(color => capitalize(color)) : ['не указаны'];

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
                        {(car.tank >= 0 && car.tank <= 100) &&
                        <div className="car_card_extra__tank_indicator">
                            <div style={{width: `${car.tank}%`}}/>
                        </div>
                        }
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
                <ListElementControl/>
            </main>
        </div>
    );
}

CarCardExtra.propTypes = {
    car: PropTypes.object
}

export default CarCardExtra;