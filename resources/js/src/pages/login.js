import React, {Component} from 'react';
import Axios from 'axios';
import {REQUEST_MANAGER_API_URL} from '../config';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            },
            msg: "",
            style: ""
        }
    }

    handleChange(e, data) {
        const user = this.state.user;
        user[data] = e;
        this.setState({ user });
    }

    async login(e){
        e.preventDefault();

        const r = await Axios.post(`${REQUEST_MANAGER_API_URL}/api/user/login`,{
            'email': this.state.user.email,
            'password': this.state.user.password
        }).then(function(r){
            return r.data;
        }).catch(function () {
            return {
                success: false,
                data: "The connection to the server failed."
            }
        });

        if (r.success) {
            document.cookie = "userId=" + r.data.id;
            document.cookie = "accessKey=" + r.data.access_key;
            this.props.history.push("/");
        } else {
            this.setState({ msg: r.data, style: "alert-danger" })
            this.handleChange("", "email")
            this.handleChange("", "password")
        }
    }

    render(){
        return(
            <div>
                <br/><br/>
                <div className='container'>
                    <div className='card w-50'>
                        <div className='card-header'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h3>Login</h3>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={(e) => this.login(e)}>
                            <div className='card-body'>
                                <div className='form-group row'>
                                    <div className='col-md-3'>
                                        <h4>Email</h4>
                                    </div>
                                    <div className='col-md-9'>
                                        <input className='form form-control' type='text' value={this.state.user.email} onChange={(e) => this.handleChange(e.target.value, "email")} />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-md-3'>
                                        <h4>Password</h4>
                                    </div>
                                    <div className='col-md-9'>
                                        <input className='form form-control' type='password' value={this.state.user.password} onChange={(e) => this.handleChange(e.target.value, "password")}/>
                                    </div>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <button type='submit' className='btn btn-primary'>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}