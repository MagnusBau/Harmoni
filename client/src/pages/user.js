//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
import { User, userService} from "../services/userService";

const history = createHashHistory();

export class UserLogin extends Component {

    attemptLogin(username: string, password: string) {
        let user = userService.getLogin(username, password);
        if(user.user_id != null) {
            localStorage.setItem("user", user);
            //use token to go to profile page
        } else {
            //report failure
        }
    }

    render() {
        return(
            <div>
                yo
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