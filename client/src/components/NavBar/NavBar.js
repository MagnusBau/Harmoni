// @flow

import React from "react";
import { Component } from "react-simplified";
import { userService} from "../../services/userService";
import {Link} from "react-router-dom";

/**
 * Class for NavBar component
 *
 * @author Victoria Blichfeldt
 */

    //TODO kunne bruke skjema i popup for å logge inn
    //TODO vise hvem som er logget inn i popup -> trenger nok noe state greier fra noe user greier når det er up and running
class NavBar extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            userId: 0,
            username: '',
            fullName: ''
        };

        userService.updateToken();
    }

    mounted(): void {
        let id = userService.getUserID();
        let username = userService.getUsername();
        let fullName = `${userService.getFirstName()} ${userService.getLastName()}`
        this.setState({userId: id, username: username, fullName: fullName});
    }

    render() {
        let userIcon;
        if (this.state.userId > 0) {
            userIcon = (
                <div className="form-inline">
                    <h5>{this.state.username}</h5>
                    <div className="dropdown m-1">
                        <button type="button" className="btn btn-outline-dark" data-toggle="dropdown" data-html="true"
                                data-content=''>
                            <img src="./img/icons/person.svg" alt="login" width="20" height="20"/>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="m-2">
                                <h5>{this.state.fullName}</h5>
                                <Link to="/event/new">Nytt arrangement</Link><br/>
                                <Link to="/mypage">Min side</Link><br/>
                                <Link to="/fuckoff">Logg ut</Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            userIcon = (
                <div>
                    <div className="dropdown m-1">
                        <button type="button" className="btn btn-outline-dark" data-toggle="dropdown" data-html="true"
                                data-content=''>
                            <img src="./img/icons/person.svg" alt="login" width="20" height="20"/>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <h3 ><a href="#/login">Logg inn</a></h3>
                            <form className="px-4 py-3">
                                <div className="form-group form-inline">
                                    <label htmlFor="username">Brukernavn</label>
                                    <input type="text" className="form-control" placeholder="Brukernavn" id="username"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword">Passord</label>
                                    <input type="password" className="form-control" placeholder="Passord"
                                           id="inputPassword"/>
                                </div>
                                <button type="submit" className="btn btn-outline-dark">LOGIN</button>
                                <div>
                                    <p>
                                        Har du ikke en bruker?
                                    </p>
                                    <a href="#/register">Registrer deg her</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }

        return(
           <nav className="navbar navbar-light bg-light sticky-top">
               <a className="navbar-brand"  href="#">Harmoni</a>
               <div className="form-inline">
                   <form className="form-inline my-2 my-lg-0">
                       <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                           <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                   </form>
                   {userIcon}
               </div>
           </nav>
        )
    }
}

export default NavBar;