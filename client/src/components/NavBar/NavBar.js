// @flow

import React from "react";
import { Component } from "react-simplified";
import { userService} from "../../services/userService";
import {Link} from "react-router-dom";
import { createHashHistory } from 'history';

const history = createHashHistory();

/**
 * Class for NavBar component
 *
 * @author Victoria Blichfeldt
 */

    //TODO kunne bruke skjema i popup for å logge inn
    //TODO vise hvem som er logget inn i popup -> trenger nok noe state greier fra noe user greier når det er up and running
class NavBar extends Component {
    form: any = null;
    username: string = "";
    password: string = "";

    constructor(props, context) {
        super(props, context);

        this.state = {
            userId: 0,
            username: '',
            fullName: ''
        };
    }

    logout() {
        userService.logout();
        this.mounted();
    }

    login() {
        userService.attemptLogin(this.username, this.password, this.mounted);
    }

    viewMyPage() {
        history.push("/user/" + userService.getUserID() + "/overview");
    }

    viewNewEvent() {
        history.push("/event/new");
    }

     mounted(): void {
         let id = userService.getUserID();
         let username = userService.getUsername();
         let fullName = `${userService.getFirstName()} ${userService.getLastName()}`;
         this.setState({userId: id, username: username, fullName: fullName});
     }

    render() {
        let userIcon;
        if (userService.getUserID() > 0) {
            console.log(userService.getUserID());
            userIcon = (
                <div className="form-inline">
                    <div className="dropdown m-1">
                        <button type="button" className="btn btn-outline-dark" data-toggle="dropdown" data-html="true"
                                data-content=''>
                            <img src="./img/icons/person.svg" alt="login" width="22" height="22"/>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="m-2">
                                <h5>{userService.getFirstName() + " " + userService.getLastName()}</h5>
                                <p className="form-text text-muted">{`@${userService.getUsername()}`}</p>
                                <div className="dropdown-divider"/>
                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    style={{}}
                                    onClick={this.viewNewEvent}
                                >Ny event</button>
                                <div className="dropdown-divider"/>
                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    style={{}}
                                    onClick={this.viewMyPage}
                                >Min side</button>
                                <div className="dropdown-divider"/>
                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    style={{}}
                                    onClick={this.logout}
                                >Logg ut</button>
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
                            <img src="./img/icons/person.svg" alt="login" width="22" height="22"/>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="m-2">
                                <form ref={e => (this.form = e)}>
                                    <p>Brukernavn:</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.username}
                                        placeholder="Brukernavn"
                                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.username = event.target.value)}
                                        required
                                        maxLength={50}
                                    />
                                    <br/>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={this.password}
                                        placeholder="Passord"
                                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.password = event.target.value)}
                                        required
                                        maxLength={256}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        style={{}}
                                        onClick={this.login}
                                    >Logg inn</button>
                                </form>
                                <div>
                                    <p>
                                        Har du ikke en bruker?
                                    </p>
                                    <Link to="/register">Registrer deg her</Link>
                                </div>
                            </div>
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