//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
import { User, userService} from "../services/userService";

const history = createHashHistory();

export class UserLogin extends Component {
    form: any = null;
    username: string = "";
    password: string = "";
    errorMessage: string = "";

    attemptLogin() {
        userService.getLogin(this.username, this.password).then(response => {
            if(response.user != null) {
                localStorage.setItem("user", response.user);
                this.errorMessage = "success";
                history.push("/");
                return;
            }
            this.errorMessage = "You failed";
        });

    }

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
                    >Login</button>
                    <br/>
                    <p>{this.errorMessage}</p>
                </div>
            </div>
        )
    }
}

export class UserRegister extends Component {

    render() {
        return(
            <div>
                yo
            </div>
        )
    }
}