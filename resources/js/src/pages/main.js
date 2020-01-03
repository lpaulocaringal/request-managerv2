import React, {Component} from 'react';
import {Route, Router} from 'react-router-dom';

import {NavBar, SideBar} from '../components'
import {AnalystHome, NewRequest} from './analyst';
import {ManagerHome, ViewRequest, EditRequest} from './manager';

export default class Main extends Component{
    constructor(props){
        super(props);
    }

    getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    render(){
        if(this.getCookie("accessKey") == "analyst"){
            return(
                <div>
                    <div className='row mt-3'>
                        <NavBar history={this.props.history}/>/>
                    </div><br/><br/>
                    <div className='container'>
                        <Route exact path='/new-request' render={({history}) => <NewRequest history={history}/>} />
                        <Route exact path='/' render={({history}) => <AnalystHome history={history}/>} />
                    </div>
                </div>
            );
        }
        else if(this.getCookie("accessKey") == "manager"){
            return(
                <div>
                    <div className='row mt-3'>
                        <NavBar history={this.props.history}/>/>
                    </div><br/><br/>
                    <div className='container'>
                        <Route exact path='/edit-request' render={({history}) => <EditRequest history={history}/>} />
                        <Route exact path='/view-request' render={({history}) => <ViewRequest history={history}/>} />
                        <Route exact path='/' render={({history}) => <ManagerHome history={history}/>} />
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    <h1>Error Logging In</h1>
                    <button onClick={this.props.history.push('/login')}>Go back to Login</button>
                </div>
            );
        }
    }
}