import React from 'react';
import PropTypes from 'prop-types';
import {capitalize} from '../../../../../utils/common_utils';
import './CarCardDescription.scss';

import ListElementControl from "../../../../common/ListElementControl/ListElementControl";

function CarCardDescription({car}) {

    const getCategoryDescription = () => car.categoryId ? `${car.categoryId.name} (${car.categoryId.description})` : 'не указана';
    const getDescription = () => car.description || 'не указано';
    const getCarTank = () => car.tank ? `${car.tank}%` : 'не указан';
    const getColors = () => car.colors && car.colors > 0 ? car.colors.map(color => capitalize(color)) : ['не указаны'];

    return (
        <div className="car_card_description">

            <h1 className="car_card_description__name">{car.name}</h1>

            <div>
                <span className="car_card_description__normal_text">Категория: </span>
                <span className="car_card_description__strong_text">
                    {getCategoryDescription()}
                </span>
            </div>

            <div>
                <span className="car_card_description__normal_text">Описание: </span>
                <span className="car_card_description__strong_text">{getDescription()}</span>
            </div>

            <div>
                <span className="car_card_description__normal_text">Гос. номер: </span>
                {(car.number && car.number !== 'undefined') ?
                    <span className="car_card_description__number">
                        {car.number}
                    </span>
                    :
                    <span className="car_card_description__strong_text">
                        не указан
                    </span>
                }
            </div>

            <div>
                <span className="car_card_description__normal_text">Цена: </span>
                <span className="car_card_description__strong_text">от {car.priceMin} до {car.priceMax}&#8381;</span>
            </div>

            <div className="car_card_description__tank">
                <span className="car_card_description__normal_text">Уровень топлива:</span>
                <span className="car_card_description__strong_text"> {getCarTank()}</span>
                {(car.tank >= 0 && car.tank <= 100) &&
                <div className="car_card_description__tank_indicator">
                    <div style={{width: `${car.tank}%`}}/>
                </div>
                }
            </div>

            <div>
                <span className="car_card_description__normal_text">Доступные цвета:</span>
                <ul>
                    {getColors().map(
                        color =>
                            <li key={color}>
                                <span className="car_card_description__strong_text">{capitalize(color)}</span>
                            </li>
                    )}
                </ul>
            </div>

            <ListElementControl/>

        </div>
    );
}

CarCardDescription.propTypes = {
    car: PropTypes.object
}

export default CarCardDescription;