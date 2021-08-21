import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './Login/Login';
import Admin from './Admin/Admin';
import NoMatch from './common_components/NoMatch/NoMatch';
import 'dotenv';

function App() {
    // TODO Для тестирования верстки сразу же переключаем пользователя на страницу логина. В будущем - пересмотреть поведение
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login"/>
                </Route>
                <Route path="/login" component={Login}/>
                <Route path="/admin" component={Admin}/>
                <Route path="*" component={NoMatch}/>
            </Switch>
        </HashRouter>
    );
}

export default App;
