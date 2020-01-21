import axios from 'axios';
import { createHashHistory } from 'history';

const history = createHashHistory();

let ip = "localhost";

class UserService {
    mountDropdown: Function = () => {};

    attemptLogin(username: string, password: string, next) {
        userService.postLogin(username, password).then(response => {
            if(this.error(response)){
                return this.error(response);
            }
            console.log("this:");
            console.log(response);
            if(response != null) {
                localStorage.setItem("user_id", response.userRegister.user_id);
                localStorage.setItem("username", response.userRegister.username);
                localStorage.setItem("image", response.userRegister.image);
                localStorage.setItem("first_name", response.userRegister.first_name);
                localStorage.setItem("last_name", response.userRegister.last_name);
                localStorage.setItem("email", response.userRegister.email);
                localStorage.setItem("phone", response.userRegister.phone);
                localStorage.setItem("contact_id", response.contact_id);
                localStorage.setItem("token", response.token);
                localStorage.setItem("artist_id", response.artist.artist_id);
                localStorage.setItem("artist_name", response.artist.artist_name);
                console.log("success:" + username + response.userRegister.user_id + response.userRegister.username);
                console.log(response.token);
                next();
            } else {
                console.log("fail");
                return false;
            }
        });
    }

    generateArtistUser(artistName: string, firstName: string, lastName: string, phone: string, email: string,
                       contactId: number) {
        let organizer = `${this.getFirstName()} ${this.getLastName()}`;
        // TODO: Handle username collisions
        let username: string = artistName.replace(/\s/g, '').toLowerCase();
        // TODO: Send email to artist
        return this.attemptRegisterArtist(username, this.generateRandomPassword(10), firstName, lastName, phone,
                                            email, contactId, organizer, artistName);
    }

    // TODO: Move to utility class?
    generateRandomPassword(length: number) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    attemptRegisterArtist(username: string, password: string, firstName: string, lastName: string, phone: string,
                          email: string, contactId: number, organizer: string, artistName: string) {
        let data = {
            "username": username,
            "password": password,
            "email": email,
            "contact_id": contactId,
            "artist_name": artistName,
            "organizer": organizer,
            "first_name": firstName,
            "last_name": lastName,
            "phone": phone
        };
        this
            .postArtistUser(data)
            .then(response => {
                if(this.error(response)){
                    return this.error(response);
                }
                if (response.error != null) {
                    console.log(response.error);
                    console.log("failed");
                    return false;
                } else {
                    return true;
                }
            });
    }

    attemptRegister(username: string, password: string, email: string, firstName: string, lastName: string, phone: string){
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
                if(this.error(response)){
                    return this.error(response);
                }
                if(response.error != null) {
                    console.log(response.error);
                    console.log("failed");
                    return false;
                }
                console.log(response);
                if(response.userRegister != null) {
                    console.log("click3");
                    localStorage.setItem("user_id", response.userRegister.user_id);
                    localStorage.setItem("username", response.userRegister.username);
                    localStorage.setItem("image", response.userRegister.image);
                    localStorage.setItem("first_name", response.userRegister.first_name);
                    localStorage.setItem("last_name", response.userRegister.last_name);
                    localStorage.setItem("email", response.userRegister.email);
                    localStorage.setItem("phone", response.userRegister.phone);
                    localStorage.setItem("contact_id", response.userRegister.contact_id);
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("artist_id", response.artist.artist_id);
                    localStorage.setItem("artist_name", response.artist.artist_name);
                    this.mountDropdown();
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
                if(this.error(response)){
                    return this.error(response);
                }
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
        return axios.put('http://' + ip +':4000/auth/id/' + this.getUserId() + '/user/user/' + userService.getUserId(), data, {
            'headers': {
                'x-access-token': this.getToken()
            }}).then(response => {
                if(this.error(response)){
                    return this.error(response);
                }
                return response.data;
            });
    }

    updatePassword(password: string, newPassword: string) {
        return axios.put('http://' + ip +':4000/auth/id/' + this.getUserId() + '/user/user/' + this.getUserId() + '/password', {"password": password, "newPassword": newPassword, "username": this.getUsername()}, {
            'headers': {
                'x-access-token': this.getToken()
            }}).then(response => {
                if(this.error(response)){
                    return this.error(response);
                }
                return response.data;
            });
    }

    getUserId() {
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

    getArtistId() {
        return localStorage.getItem("artist_id");
    }

    getArtistName() {
        return localStorage.getItem("artist_name");
    }

    postLogin(username: string, password: string) {
        let data = {
            "username": username,
            "password": password
        };
        return axios.post('http://' + ip + ':4000/auth/login', data).then(response => {
            if(this.error(response)){
                return this.error(response);
            }
            return response.data;
        });

    }

    getUser() {
        return axios.get('http://' + ip + ':4000/auth/id/' + userService.getUserId() + "/user/user/" + userService.getUserId(), {
            'headers': {
                'x-access-token': this.getToken()
            }}).then(response => {
            if(this.error(response)){
                return this.error(response);
            }
            console.log(response.data);
            if (response.data.userRegister != null) {
                localStorage.setItem("user_id", response.data.userRegister.user_id);
                localStorage.setItem("username", response.data.userRegister.username);
                localStorage.setItem("image", response.data.userRegister.image);
                localStorage.setItem("first_name", response.data.userRegister.first_name);
                localStorage.setItem("last_name", response.data.userRegister.last_name);
                localStorage.setItem("email", response.data.userRegister.email);
                localStorage.setItem("phone", response.data.userRegister.phone);
                localStorage.setItem("contact_id", response.data.userRegister.contact_id);
                console.log("this:" + localStorage.getItem("last_name"));
            }
        });
    }

    postUser(data: Object) {
        return axios.post('http://' + ip +':4000/auth/register', data).then(response => {
            if(this.error(response)){
                return this.error(response);
            }
            return response.data;
        });
    }

    postArtistUser(data: Object) {
        return axios.post(`http://${ip}:4000/auth/id/${userService.getUserId()}/user/artist`, data, {
            'headers': {
                'x-access-token': this.getToken()
            }}).then(response => {
                if(this.error(response)){
                    return this.error(response);
                }
                return response.data;
            });
    }

    postToken(input: Object) {
        let data = {
            "user_id": input.user_id,
            "username": input.username
        };
        return axios.post('http://' + ip +':4000/auth/token', data, {
            'headers': {
                'x-access-token': this.getToken()
            }}).then(response => {
                if(this.error(response)){
                    return this.error(response);
                }
                return response.data;
            });
    }

    logout() {
        localStorage.setItem("user_id", null);
        localStorage.setItem("username", null);
        localStorage.setItem("image", null);
        localStorage.setItem("first_name", null);
        localStorage.setItem("last_name", null);
        localStorage.setItem("email", null);
        localStorage.setItem("phone", null);
        localStorage.setItem("contact_id", null);
        localStorage.setItem("token", null);
        localStorage.setItem("artist_id", null);
        localStorage.setItem("artist_name", null);
    }

    error(res: Response) {
        if(res.data) {
            if(res.data.error) {
                if(res.data.error === "Token") {
                    this.logout();
                    this.mountDropdown();
                    history.push("/login");
                    return res.data;
                } else if(res.data.error === "Not authorized") {
                    history.push("/404");
                    return res.data;
                } else {
                    return res.data;
                }
            }
        }
        return false;
    }

    setMountDropdown(mountDropdown: Function) {
        this.mountDropdown = mountDropdown;
    }

    mountDropdown() {
        this.mountDropdown();
    }
}

export let userService = new UserService();