//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import { userService } from "../services/userService";
import { createHashHistory } from 'history';

const history = createHashHistory();

export class UserRegister extends Component {

    form: any = null;
    username: string = "";
    password: string = "";
    email: string = "";
    firstName: string = "";
    lastName: string = "";
    phone: string = "";
    errorMessage: string = "";

    render() {
        return(
            <div className="row justify-content-center">
                <div className="card" style={{width: "25%"}}>
                    <form ref={e => (this.form = e)}>
                        <p>email:</p>
                        <input
                            type="email"
                            className="form-control"
                            value={this.email}
                            placeholder="its@m.e"
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.email = event.target.value)}
                            required
                            maxLength={50}
                        />
                        <p>Fornavn:</p>
                        <input
                            type="text"
                            className="form-control"
                            value={this.firstName}
                            placeholder="Mario"
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.firstName = event.target.value)}
                            required
                            maxLength={50}
                        />
                        <p>Etternavn:</p>
                        <input
                            type="text"
                            className="form-control"
                            value={this.lastName}
                            placeholder="Bros"
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.lastName = event.target.value)}
                            required
                            maxLength={50}
                        />
                        <p>Telefonnummer:</p>
                        <input
                            type="text"
                            className="form-control"
                            value={this.phone}
                            placeholder=""
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.phone = event.target.value)}
                            required
                            minLength={8}
                            maxLength={12}
                        />
                        <p>Brukernavn:</p>
                        <input
                            type="text"
                            className="form-control"
                            value={this.username}
                            placeholder="Mario"
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.username = event.target.value)}
                            required
                            minLength={1}
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
                            minLength={1}
                            maxLength={256}
                        />
                    </form>
                    <br/>
                    <button
                        type="button"
                        className="btn btn-dark"
                        style={{}}
                        onClick={this.attemptRegister}
                    >Registrer deg</button>
                    <br/>
                    <p style={{color: "red"}}>{this.errorMessage}</p>
                </div>
            </div>
        )
    }
    attemptRegister(){
        if(!this.form || !this.form.checkValidity()) {
            this.errorMessage = "Fyll ut de røde feltene";
            return;
        }
        console.log("click2");
        userService.attemptRegister(this.username, this.password, this.email, this.firstName, this.lastName, this.phone, history);
    }
}

export class TokenBoi extends Component{
    render(){
        return(
            <div>
                <button
                    type="button"
                    className="btn btn-dark"
                    style={{}}
                    onClick={userService.updateToken}
                >Lag ny token</button>
            </div>
        )
    }
}