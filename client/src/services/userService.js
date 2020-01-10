import axios from 'axios';

let ip = "localhost";

class UserService {
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
        console.log("input user");
        console.log(input.user_id);
        return axios.post('http://' + ip +':8080/api/' + input.user.user_id + '/token', data, {
            'headers': {
                'x-access-token': input.token
            }}).then(response => response.data);
    }
}

export let userService = new UserService();