//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import { userService } from "../services/userService";
import { createHashHistory } from 'history';

const history = createHashHistory();

export class UserLogin extends Component {
    form: any = null;
    username: string = "";
    password: string = "";
    errorMessage: string = "";

    render() {
        return(
            <div>
                <div className="card" style={{width: "25%"}}>
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
                    </form>
                    <br/>
                    <button
                        type="button"
                        className="btn btn-dark"
                        style={{}}
                        onClick={this.attemptLogin}
                    >Logg inn</button>
                    <p>{this.errorMessage}</p>
                    <button
                        type="button"
                        className="btn btn-light"
                        style={{}}
                        onClick={this.register}
                    >Registrer</button>
                </div>
            </div>
        )
    }

    attemptLogin() {
        userService.attemptLogin(this.username, this.password, ()=>{});
        history.push("/");
    }

    register() {
        history.push("/register");
    }
}