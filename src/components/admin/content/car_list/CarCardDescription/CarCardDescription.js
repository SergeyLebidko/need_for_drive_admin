import React from 'react';
import PropTypes from 'prop-types';
import {capitalize} from '../../../../../utils/common_utils';
import './CarCardDescription.scss';

function CarCardDescription({car}) {
    return (
        <div className="car_card_description">
            <span className="car_card_description__name">{car.name}</span>
            {car.categoryId &&
            <div>
                <span className="car_card_description__cat_name">{car.categoryId.name}</span>
                <span className="car_card_description__cat_description"> ({car.categoryId.description})</span>
            </div>
            }
            <span className="car_card_description__description">{car.description}</span>
            {(car.number && car.number !== 'undefined') &&
            <span className="car_card_description__number">
                {car.number}
            </span>
            }
            <span className="car_card_description__price">Цена: от {car.priceMin} до {car.priceMax}&#8381;</span>
            {car.tank &&
            <div className="car_card_description__tank">
                Топливо: {car.tank}%
                {(car.tank >= 0 && car.tank <= 100) &&
                <div className="car_card_description__tank_indicator">
                    <div style={{width: `${car.tank}%`}}/>
                </div>
                }
            </div>
            }
            {car.colors && car.colors.length > 0 &&
            <div className="car_card_description__colors">
                Доступные цвета:
                <ul>
                    {car.colors.map(color => <li key={color}>{capitalize(color)}</li>)}
                </ul>
            </div>
            }
        </div>
    );
}

CarCardDescription.propTypes = {
    car: PropTypes.object
}

export default CarCardDescription;