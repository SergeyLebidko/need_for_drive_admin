import React from 'react';
import PropTypes from 'prop-types';
import './CarCardDescription.scss';

function CarCardDescription({car}){
    return (
        <div>
            Здесь будет описание модели {car.name}
        </div>
    );
}

CarCardDescription.propTypes = {
    car: PropTypes.object
}

export default CarCardDescription;