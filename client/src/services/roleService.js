// @flow

import axios from 'axios';

export class Role {
    type: string;
    event: number;
}
class RoleService {
    getAllRoles() {
        return axios.get<Role[]>('http://localhost:4000/api/role').then(response => response.data);
    }
    getEventRoles(eventId: number) {
        return axios.get<Role[]>('http://localhost:4000/api/role?event=${eventId}').then(response => response.data);
    }
    createRol() {
        return axios.post<Role, void>('')
    }


}

export let roleService = new RoleService();