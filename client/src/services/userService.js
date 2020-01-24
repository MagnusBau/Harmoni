//@flow

import axios from 'axios';
import { createHashHistory } from 'history';

const history = createHashHistory();

let ip = "localhost";

class UserService {
    mountDropdown: Function = () => {};
    mountMap: Function = () => {};

    attemptLogin(username: string, password: string, next) {
        userService.postLogin(username, password).then(response => {
            if(this.error(response)){
                return this.error(response);
            }
            if(response != null) {
                localStorage.setItem("user_id", response.user.user_id);
                localStorage.setItem("username", response.user.username);
                localStorage.setItem("image", response.user.image);
                localStorage.setItem("first_name", response.user.first_name);
                localStorage.setItem("last_name", response.user.last_name);
                localStorage.setItem("email", response.user.email);
                localStorage.setItem("phone", response.user.phone);
                localStorage.setItem("contact_id", response.contact_id);
                localStorage.setItem("token", response.token);
                localStorage.setItem("artist_id", response.artist.artist_id);
                localStorage.setItem("artist_name", response.artist.artist_name);
                this.mountDropdown();
                next();
                return response;
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
                                            email, contactId, organizer, artistName)
            .then(response => response.data);
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
        return this
            .postArtistUser(data)
            .then(response => {
                if(this.error(response)){
                    return this.error(response);
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
                    localStorage.setItem("artist_id", response.artist.artist_id);
                    localStorage.setItem("artist_name", response.artist.artist_name);
                    this.mountDropdown();
                    history.push("/");
                    return true;
                }
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

    getUserId(): number {
        return localStorage.getItem("user_id");
    }

    getContactId(): number {
        return localStorage.getItem("user_id");
    }

    getUsername(): string {
        return localStorage.getItem("username");
    }

    getIamge() {
        return localStorage.getItem("image");
    }

    getFirstName(): string {
        return localStorage.getItem("first_name");
    }

    getLastName(): string {
        return localStorage.getItem("last_name");
    }

    getEmail(): string {
        return localStorage.getItem("email");
    }

    getPhone(): string {
        return localStorage.getItem("phone");
    }

    getToken() {
        return localStorage.getItem("token");
    }

    getArtistId(): number {
        return localStorage.getItem("artist_id");
    }

    getArtistName(): string {
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
            if (response.data.user != null) {
                localStorage.setItem("user_id", response.data.user.user_id);
                localStorage.setItem("username", response.data.user.username);
                localStorage.setItem("image", response.data.user.image);
                localStorage.setItem("first_name", response.data.user.first_name);
                localStorage.setItem("last_name", response.data.user.last_name);
                localStorage.setItem("email", response.data.user.email);
                localStorage.setItem("phone", response.data.user.phone);
                localStorage.setItem("contact_id", response.data.user.contact_id);
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
        return axios.post(`http://${ip}:4000/auth/register`, data, {
            'headers': {
                'x-access-token': this.getToken()
            }}).then(response => {
                if(this.error(response)){
                    return this.error(response);
                }
                return response.data;
            });
    }

    updateToken() {
        let data = {
            "user_id": localStorage.getItem("user_id"),
            "username": localStorage.getItem("username"),
            "token": localStorage.getItem("token")
        };
        return axios.post('http://' + ip +':4000/auth/id/' + this.getUserId() + '/user/token', data, {
            'headers': {
                'x-access-token': this.getToken()
            }}).then(response => {
                if(this.error(response)){
                    return this.error(response);
                }
                localStorage.setItem("token", response.data.token);
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

    setArtist(artist_id: number, artist_name: string) {
        localStorage.setItem("artist_id", artist_id);
        localStorage.setItem("artist_name", artist_name);
    }

    checkToken() {
        if(localStorage.getItem("token_time") != null) {
            if(new Date().getTime() - new Date(localStorage.getItem("token_time")).getTime() > 60000) {
                localStorage.setItem("token_time", (new Date()).toString());
                console.log("update token");
                this.updateToken();
            }
        } else {
            localStorage.setItem("token_time", (new Date()).toString());
            this.updateToken();
        }
    }

    error(res: Response, token: boolean) {
        if(!token && this.getUserId() !== "null") {
            this.checkToken();
        }
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
        } else if(res.error) {
            return res;
        }
        return false;
    }

    setMountDropdown(mountDropdown: Function) {
        this.mountDropdown = mountDropdown;
    }

    mountDropdown() {
        this.mountDropdown();
    }

    setMountMap(mountMap: Function) {
        this.mountMap = mountMap;
    }

    mountMap() {
        this.mountMap();
    }


    getOrganizerUsername(contactId: number) {
        return axios.get('http://localhost:4000/api/event/organizer/' + contactId)
            .then(response => {
                console.log("Hello!");
                return response.data})
            .catch(error => console.log(error.message));
    }
}

export let userService = new UserService();