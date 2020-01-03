import React, {Component} from 'react'
import {Link} from "react-router-dom";
import CheeseburgerMenu from 'cheeseburger-menu'
import HamburgerMenu from 'react-hamburger-menu'

class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false,
        }
    }

    openMenu() {
        this.setState({ menuOpen: true })
    }

    closeMenu() {
        this.setState({ menuOpen: false })
    }

    deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    logout() {
        this.deleteCookie("adminKey");
        this.props.history.push("/login");
    }

    render(){
        return(
            <div>
                <CheeseburgerMenu
                    isOpen={this.state.menuOpen}
                    closeCallback={this.closeMenu.bind(this)}>
                    <div className='col'>
                        <ul className='list-group mt-3' onClick={this.closeMenu.bind(this)}>
                            <Link to={'/'}><li className='list-group-item mt-1'><span className='fa fa-fw fa-home'></span> Home</li></Link>
                            <Link to={'/request'}><li className='list-group-item mt-1'><span className='fa fa-fw fa-file'></span> Request</li></Link>
                        </ul>
                        <ul className='list-group mx-3 mb-3 fixed-bottom'>
                            <li className='list-group-item' onClick={() => this.logout()}><span className='fa fa-fw fa-sign-out-alt'></span> Logout</li>
                        </ul>
                    </div>  
                </CheeseburgerMenu>
                
                <HamburgerMenu
                    isOpen={this.state.menuOpen}
                    menuClicked={this.openMenu.bind(this)}
                    width={32}
                    height={24}
                    strokeWidth={3}
                    rotate={0}
                    color='black'
                    borderRadius={0}
                    animationDuration={0.5}
                />
            </div>
        );
    }
}

export default SideBar;
