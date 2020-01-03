import React, {Component} from 'react';
import {Link,Redirect,NavLink} from 'react-router-dom';
import {Navbar, Nav, Form, FormControl, Button, Container} from 'react-bootstrap';

class NavBar extends Component{
    constructor(props){
        super(props);
    }

    deleteCookie(name){
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    logout() {
        this.deleteCookie("accessKey");
        this.props.history.push("/login");
    }

    render(){
        return(
            <Navbar bg="dark" variant="dark" fixed='top'>
            <Navbar.Brand href="#home">Forms 2</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link><NavLink to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>Home</NavLink></Nav.Link>
            </Nav>
            <Nav>
                <span onClick={this.logout.bind(this)}><Nav.Link>Sign out</Nav.Link></span>
            </Nav>
            </Navbar>
        );
    }
}

export default NavBar;