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
        userService.postLogin(this.username, this.password).then(response => {
            if(response.user != null) {
                console.log(response.token);
                console.log(response.user);
                console.log(response.user.user_id);
                localStorage.setItem("user", response.user);
                localStorage.setItem("token", response.token);
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

    form: any = null;
    username: string = "";
    password: string = "";
    email: string = "";
    firstname: string = "";
    lastname: string = "";
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
                            value={this.firstname}
                            placeholder="Mario"
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.firstname = event.target.value)}
                            required
                            maxLength={50}
                        />
                        <p>Etternavn:</p>
                        <input
                            type="text"
                            className="form-control"
                            value={this.lastname}
                            placeholder="Bros"
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.lastname = event.target.value)}
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
        if(!this.form || !this.form.checkValidity()){
            this.errorMessage = "Fyll ut de røde feltene";
            this.mounted();
            return;
        }
        let data = {
            "username": this.username,
            "password": this.password,
            "email": this.email,
            "first_name": this.firstname,
            "last_name": this.lastname,
            "phone": this.phone
        };
        userService
            .postRegister(data)
            .then(response => {
                if(response.user != null) {
                    localStorage.setItem("user", response.user);
                    localStorage.setItem("token", response.token);
                    this.errorMessage = "success";
                    history.push("/");
                    return;
                }
                this.errorMessage = "Noe gikk galt";
            });

    }
    mounted(){}
}

export class TokenBoi extends Component{
    render(){
        return(
            <div>
                <button
                    type="button"
                    className="btn btn-dark"
                    style={{}}
                    onClick={this.getToken}
                >Lag ny token</button>
            </div>
        )
    }
    getToken(){
        userService
            .postToken({
                "user": localStorage.getItem("user"),
                "token": localStorage.getItem("token")
            })
            .then(response => {
                console.log(localStorage.setItem("token", response));
            });

    }
}