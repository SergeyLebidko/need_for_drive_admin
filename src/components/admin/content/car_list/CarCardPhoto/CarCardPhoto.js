import React from 'react';
import PropTypes from 'prop-types';
import './CarCardPhoto.scss';

function CarCardPhoto({car}){
    return (
        <div>
            Фото автомобиля {car.name}
        </div>
    )
}

CarCardPhoto.propTypes = {
    car: PropTypes.object
}

export default CarCardPhoto;