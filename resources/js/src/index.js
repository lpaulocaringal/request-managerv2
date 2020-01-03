import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import {Login, Main} from './pages';

export default class App extends Component{
    constructor(props){
        super(props);
    }

    getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    requireAuth(page) {
        if (!this.getCookie("accessKey")) {
            return <Redirect to="/login" />
        }
        return page
    }

    checkAuth(page) {
        if (this.getCookie("accessKey")) {
            return <Redirect to="/" />
        }
        return page
    }
    
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/login' render={({ history }) => this.checkAuth(<Login history={history} />)} />
                    <Route path='/' render={({ history }) => this.requireAuth(<Main history={history} />)} />
                </Switch>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}