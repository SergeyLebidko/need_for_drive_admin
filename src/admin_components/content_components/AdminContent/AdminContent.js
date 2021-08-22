import React from 'react';
import './AdminContent.scss';

function AdminContent() {
    // TODO Удалить инлайновый стиль. Сейчас он нужен только для тестирования верстки страницы admin
    return (
        <main className="admin_content" style={{padding: '15px', color: 'gray'}}>
            Здесь будет контент (компоненты для работы со списками и объектами)
        </main>
    )
}

export default AdminContent;