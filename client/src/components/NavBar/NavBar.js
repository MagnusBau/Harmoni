// @flow

import React from "react";
import { Component } from "react-simplified";

/**
 * Class for NavBar component
 *
 * @author Victoria Blichfeldt
 */

class NavBar extends Component {

    render() {
        return(
           <nav className="navbar navbar-light bg-light sticky-top">
               <a className="navbar-brand"  href="#">Harmoni</a>
               <div className="form-inline">
                   <form className="form-inline my-2 my-lg-0">
                       <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                           <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                   </form>

                   <div className="well">
                       <button type="button" className="btn btn-outline-dark" data-toggle="popover" data-html="true"
                       data-content='<div className="form-group">
                               <label htmlFor="username">Brukernavn</label>
                               <input type="text" className="form-control" placeholder="Brukernavn" id="username"/>
                           </div>
                           <div className="form-group">
                               <label htmlFor="inputPassword">Passord</label>
                               <input type="password" className="form-control" placeholder="Passord"
                                      id="inputPassword"/>
                           </div>
                           <button type="button" className="btn btn-outline-dark"></button>
                           <div>
                               <p>
                                   Har du ikke en bruker?
                               </p>
                               <a href="/register">Registrer deg her</a>
                           </div>'>
                           icon her login
                       </button>
                   </div>
               </div>
           </nav>
        )
    }
}

export default NavBar;