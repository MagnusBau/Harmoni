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
                localStorage.setItem("contact_id", response.user.contact_id);
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
            .postUser(data)
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

    updateUser(email: string, firstName: string, lastName: string, phone: string) {
        let data = {
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
            "phone": phone
        };
        return axios.put('http://' + ip +':4000/auth/user/' + this.getUserID(), data).then(response => response.data);
    }

    updatePassword(password: string, newPassword: string) {
        return axios.put('http://' + ip +':4000/auth/user/' + this.getUserID() + '/password', {"password": password, "newPassword": newPassword, "username": this.getUsername()}).then(response => response.data);
    }

    getUserID() {
        return localStorage.getItem("user_id");
    }

    getContactId() {
        return localStorage.getItem("user_id");
    }

    getUsername() {
        return localStorage.getItem("username");
    }

    getIamge() {
        return localStorage.getItem("image");
    }

    getFirstName() {
        return localStorage.getItem("first_name");
    }

    getLastName() {
        return localStorage.getItem("last_name");
    }

    getEmail() {
        return localStorage.getItem("email");
    }

    getPhone() {
        return localStorage.getItem("phone");
    }

    getToken() {
        return localStorage.getItem("token");
    }

    postLogin(username: string, password: string) {
        let data = {
            "username": username,
            "password": password
        };
        return axios.post('http://' + ip + ':4000/auth/login', data).then(response => response.data);

    }

    postUser(data: Object) {
        return axios.post('http://' + ip +':4000/auth/user', data).then(response => response.data);
    }

    postToken(input: Object) {
        let data = {
            "user_id": input.user_id,
            "username": input.username
        };
        return axios.post('http://' + ip +':4000/auth/' + data.user_id + '/token', data, {
            'headers': {
                'x-access-token': this.getToken()
            }}).then(response => response.data);
    }

    logout() {
        localStorage.setItem("user_id", null);
        localStorage.setItem("username", null);
        localStorage.setItem("image", null);
        localStorage.setItem("first_name", null);
        localStorage.setItem("last_name", null);
        localStorage.setItem("email", null);
        localStorage.setItem("phone", null);
        localStorage.setItem("token", null);
    }
}

export let userService = new UserService();