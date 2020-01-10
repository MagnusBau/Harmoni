import axios from 'axios';

let ip = "localhost";

class UserService {
    attemptLogin(username: string, password: string, history: any) {
        userService.postLogin(username, password).then(response => {
            if(response.user != null) {
                localStorage.setItem("user_id", response.user.user_id);
                localStorage.setItem("username", response.user.username);
                localStorage.setItem("image", response.user.image);
                localStorage.setItem("first_name", response.user.first_name);
                localStorage.setItem("last_name", response.user.last_name);
                localStorage.setItem("email", response.user.email);
                localStorage.setItem("phone", response.user.phone);
                localStorage.setItem("token", response.token);
                console.log("success:" + username + response.user.user_id + response.user.username);
                console.log(response.token);
                history.push("/");
                return true;
            }
            return false;
        });

    }

    attemptRegister(username: string, password: string, email: string, firstName: string, lastName: string, phone: string, history: any){
        let data = {
            "username": username,
            "password": password,
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
            "phone": phone
        };
        userService
            .postRegister(data)
            .then(response => {
                if(response.error != null) {
                    console.log(response.error);
                    console.log("failed");
                    return false;
                }
                if(response.user != null) {
                    localStorage.setItem("user_id", response.user.user_id);
                    localStorage.setItem("username", response.user.username);
                    localStorage.setItem("image", response.user.image);
                    localStorage.setItem("first_name", response.user.first_name);
                    localStorage.setItem("last_name", response.user.last_name);
                    localStorage.setItem("email", response.user.email);
                    localStorage.setItem("phone", response.user.phone);
                    localStorage.setItem("token", response.token);
                    history.push("/");
                    return true;
                }
            });

    }

    updateToken() {
        userService
            .postToken({
                "user_id": localStorage.getItem("user_id"),
                "username": localStorage.getItem("username"),
                "token": localStorage.getItem("token")
            })
            .then(response => {
                localStorage.setItem("token", response.token);
                console.log(response.token);
            });

    }

    getToken() {
        return localStorage.getItem("token");
    }

    postLogin(username: string, password: string) {
        let data = {
            "username": username,
            "password": password
        };
        return axios.post('http://' + ip +':8080/login', data).then(response => response.data);

    }

    postRegister(input: Object) {
        let data = {
            "username": input.username,
            "password": input.password,
            "email": input.email,
            "first_name": input.first_name,
            "last_name": input.last_name,
            "phone": input.phone
        }
        return axios.post('http://' + ip +':8080/register', data).then(response => response.data);
    }

    postToken(input: Object) {
        let data = {
            "user_id": input.user_id,
            "username": input.username
        };
        return axios.post('http://' + ip +':8080/api/' + data.user_id + '/token', data, {
            'headers': {
                'x-access-token': this.getToken()
            }}).then(response => response.data);
    }
}

export let userService = new UserService();