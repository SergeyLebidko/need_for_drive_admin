import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin';
import NoMatch from './common/NoMatch/NoMatch';
import {LOGIN_APP_URL, ADMIN_APP_URL, REGISTER_APP_URL} from '../constants/urls';
import 'dotenv';

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to={`/${ADMIN_APP_URL}`}/>
                </Route>
                <Route path={`/${LOGIN_APP_URL}`} component={Login}/>
                <Route path={`/${REGISTER_APP_URL}`} component={Register}/>
                <Route path={`/${ADMIN_APP_URL}`} component={Admin}/>
                <Route path="*" component={NoMatch}/>
            </Switch>
        </HashRouter>
    );
}

export default App;
