import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './Login/Login';

function App() {
    // TODO Для тестирования верстки сразу же переключаем пользователя на страницу логина. В будущем - пересмотреть поведение
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login"/>
                </Route>
                <Route path="/login" component={Login}/>
            </Switch>
        </HashRouter>
    );
}

export default App;
