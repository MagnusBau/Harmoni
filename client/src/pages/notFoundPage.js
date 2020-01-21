// @flow

import * as React from 'react';
import { Component } from 'react-simplified';

//TODO legg til link til rapporter problemsiden
export class NotFoundPage extends Component {
    render() {
        return (
            <div className="container">
                <h1>404!</h1>
                <h3>Oooooooops...</h3>
                <hr/>
                <p>Vi kan ikke finne siden du leter etter...</p>
                <p>Det kan være lurt å ta turen tilbake til hjemmesiden. <br/>
                Hvis du tror noe er ødelagt, rapporter problemet</p>
                <hr/>
                <a className="btn btn btn-outline-success" href="#" role="button" >Hjem</a>
                <a className="btn btn btn-outline-success" href="#/contactUs" role="button" >Kontakt oss</a>
            </div>
        );
    }
}