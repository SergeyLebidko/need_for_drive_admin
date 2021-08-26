import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './CheckBox.scss';

function CheckBox({caption, defaultValue, handleChange, disabled}) {
    let [value, setValue] = useState(defaultValue);

    const clickHandler = () => {
        if (disabled || !handleChange) return;
        handleChange(!value);
        setValue(!value);
    }

    const labelClasses = classNames('check_box', {'checked_box': value, 'unchecked_box': !value, 'disabled_box': disabled});

    return (
        <label onClick={clickHandler} className={labelClasses}>
            {caption}
        </label>
    );
}

CheckBox.defaultProps = {
    disabled: false,
    handleChange: null
}

CheckBox.propTypes = {
    caption: PropTypes.string,
    defaultValue: PropTypes.bool,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool
}

export default CheckBox;