import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './EditorControlBlock.scss';

function EditorControlBlock({handleSave, handleCancel, handleRemove, saveEnabled, cancelEnabled, removeEnabled}) {
    const handleSaveButtonClick = () => {
        if (saveEnabled && handleSave) handleSave();
    }

    const handleCancelButtonClick = () => {
        if (cancelEnabled && handleCancel) handleCancel();
    }

    const handleRemoveButtonClick = () => {
        if (removeEnabled && handleRemove) handleRemove();
    }

    const saveButtonClasses = classNames('button', 'button_blue', {'button_disabled': !saveEnabled});
    const cancelButtonClasses = classNames('button', 'button_silver', {'button_disabled': !cancelEnabled});
    const removeButtonClasses = classNames('button', 'button_red', {'button_disabled': !removeEnabled});

    return (
        <div className="editor_control_block">
            <button className={saveButtonClasses} onClick={handleSaveButtonClick}>Сохранить</button>
            <button className={cancelButtonClasses} onClick={handleCancelButtonClick}>Отменить</button>
            <button className={removeButtonClasses} onClick={handleRemoveButtonClick}>Удалить</button>
        </div>
    );
}

EditorControlBlock.defaultProps = {
    saveEnabled: true,
    cancelEnabled: true,
    removeEnabled: true
}

EditorControlBlock.propTypes = {
    handleSave: PropTypes.func,
    handleCancel: PropTypes.func,
    handleRemove: PropTypes.func,
    saveEnabled: PropTypes.bool,
    cancelEnabled: PropTypes.bool,
    removeEnabled: PropTypes.bool
}

export default EditorControlBlock;