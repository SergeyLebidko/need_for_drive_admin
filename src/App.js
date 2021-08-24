import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './Login/Login';
import Admin from './Admin/Admin';
import NoMatch from './common_components/NoMatch/NoMatch';
import {LOGIN_APP_URL, ADMIN_APP_URL} from './urls';
import 'dotenv';

function App() {
    // TODO Для тестирования верстки сразу же переключаем пользователя на страницу логина. В будущем - пересмотреть поведение
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login"/>
                </Route>
                <Route path={`/${LOGIN_APP_URL}`} component={Login}/>
                <Route path={`/${ADMIN_APP_URL}`} component={Admin}/>
                <Route path="*" component={NoMatch}/>
            </Switch>
        </HashRouter>
    );
}

export default App;
