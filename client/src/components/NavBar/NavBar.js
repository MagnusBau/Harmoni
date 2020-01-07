// @flow

import React from "react";
import { Component } from "react-simplified";
import Footer from "../Footer/Footer";

/**
 * Class for NavBar
 *
 * @author Victoria Blichfeldt
 */

class NavBar extends Component {

    render() {
        return(
           <nav className="navnbar navbar-light bg-light sticky-top">
                <a className="navbar-brand"  href="#">Harmoni</a>
               <div className="form-inline">
                   <form className="form-inline my-2 my-lg-0">
                       <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                           <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                   </form>
                   <button type="button" className="btn" data-container="body" data-toggle="popover" data-placement="left">
                       <svg className=" bi bi-person"/>
                   </button>
                   <div className="popover-content">
                        <div className="form-group">
                            <label for="username">Brukernavn</label>
                            <input type="text" className="form-control" placeholder="Brukernavn" id="username"/>
                        </div>
                       <div className="form-group">
                           <label for="inputPassword">Passord></label>
                           <input type="password" className="form-control" placeholder="Passord" id="inputPassword"/>
                       </div>
                       <div>
                           <p>
                               Har du ikke en bruker?
                           </p>
                           <a href="/register">Registrer deg her</a>
                       </div>
                   </div>
               </div>
           </nav>
        )
    }
}

export default NavBar;