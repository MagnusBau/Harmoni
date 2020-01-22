// @flow

import React from "react";
import { Component } from "react-simplified";
import { userService} from "../../services/userService";
import {Link} from "react-router-dom";
import { createHashHistory } from 'history';
import {SearchBar} from "../SearchBar/searchBar";

const history = createHashHistory();

/**
 * Class for NavBar component
 *
 * @author Victoria Blichfeldt
 */

    //TODO kunne bruke skjema i popup for å logge inn
    //TODO vise hvem som er logget inn i popup -> trenger nok noe state greier fra noe user greier når det er up and running
    //TODO rette opp navbar
class NavBar extends Component {
    form: any = null;
    firstName: string = "";
    lastName: string = "";
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
        history.push("/");
    }

    login() {
        userService.attemptLogin(this.username, this.password, this.mounted);
    }

    viewMyPage() {
        history.push("/user/" + userService.getUserId() + "/overview");
    }

    viewNewEvent() {
        history.push("/event/new");
    }

     mounted(): void {
        if(userService.getUserId() != null && userService.getUserId() !== "null") {
            this.username = userService.getUsername();
            this.firstName = userService.getFirstName();
            this.lastName = userService.getLastName();
        }
         let id = userService.getUserId();
         let username = userService.getUsername();
         let fullName = `${userService.getFirstName()} ${userService.getLastName()}`;
         this.setState({userId: id, username: username, fullName: fullName});
         userService.setMountDropdown(this.mounted);
     }

    render() {
        let userIcon;
        if (userService.getUserId() > 0) {
            userIcon = (
                <div className="form-inline">
                    <div className="dropdown m-1">
                        <button type="button" className="btn btn-outline-dark" data-toggle="dropdown" data-html="true"
                                data-content=''>
                            <img  className="icon" src="./img/icons/person.svg" alt="login" width="22" height="22"/>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="m-2">
                                <h5>{this.firstName + " " + this.lastName}</h5>
                                <p className="form-text text-muted">{`@${this.username}`}</p>
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
                            <img className="icon" src="./img/icons/person.svg" alt="login" width="22" height="22"/>
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
                                        type="submit"
                                        className="btn btn-dark"
                                        style={{}}
                                        onClick={this.login}>
                                        Logg inn
                                    </button>
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

        //TODO flytte user popup til høyre når movil view
        return(
           <nav className="navbar navbar-light navbar-expand-md sticky-top">
               <a className="navbar-brand"  href="#">Harmoni</a>
               <button className="navbar-toggler" type="button" data-toggle="collapse"
                       data-target="#navbarContent" aria-controls="navbarContent"
                       aria-expanded="false" aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon"/>
               </button>

               <div className="collapse navbar-collapse justify-content-lg-end mr-auto" id="navbarContent">
                   <div className="nav form-group form-inline mr-auto">
                       <SearchBar>

                       </SearchBar>
                   </div>
                   <div className="nav-item">
                        {userIcon}
                   </div>
               </div>
           </nav>
        )
    }

}


export default NavBar;