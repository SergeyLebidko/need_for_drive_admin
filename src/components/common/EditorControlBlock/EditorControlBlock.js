import React from 'react';
import PropTypes from 'prop-types';
import './EditorControlBlock.scss';

function EditorControlBlock({handleSave, handleCancel, handleRemove}) {
    return (
        <div className="editor_control_block">
            <button className="button button_blue" onClick={handleSave}>Сохранить</button>
            <button className="button button_silver" onClick={handleCancel}>Отменить</button>
            <button className="button button_red" onClick={handleRemove}>Удалить</button>
        </div>
    );
}

EditorControlBlock.propTypes = {
    handleSave: PropTypes.func,
    handleCancel: PropTypes.func,
    handleRemove: PropTypes.func
}

export default EditorControlBlock;