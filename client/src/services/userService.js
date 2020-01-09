import axios from 'axios';

let ip = "localhost";

/*export class User {
    user_id: number;
    username: string;
    image: any;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    token: string;

    constructor(username: string, image: any, first_name: string, last_name: string, email: string, phone: string) {
        this.username = username;
        this.image = image;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
    }
}*/

class UserService {
    postLogin(username: string, password: string) {
        let data = {
            "username": username,
            "password": password
        };
        return axios.post('http://' + ip +':8080/login', data).then(response => response.data);

    }

    postRegister(user: Object) {
        let data = {
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": user.phone
        }
        return axios.get('http://' + ip +':8080/register', data).then(response => response.data);
    }

    postToken(input: Object) {
        let data = {
            "user_id": input.user.user_id,
            "username": input.user.username,
            "token": input.token
        }
        return axios.post('http://' + ip +':8080/api/' + user.user_id + '/token', data).then(response => response.data);
    }
}

export let userService = new UserService();