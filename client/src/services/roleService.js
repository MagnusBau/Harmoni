// @flow

import axios from 'axios';

export class Role {
    type: string;
    event: number;
}

class RoleService {
    getAllRoles() {
        return axios.get<Role[]>('http://localhost:4000/role').then(response => response.data);
    }
    getEventRoles(eventId: number) {
        return axios.get<Role[]>('http://localhost:4000/role?event=$' + eventId).then(response => response.data);
    }
    createRole(role: Role) {
        return axios.post<Role, void>('http://localhost:4000/role', role).then(response => response.data);
    }
    assignRole(role: Role) {
        return axios.put<Role, void>('http://localhost:4000/role', role).then(response => response.data);
    }
    removeRoleFromEvent(role: Role) {
        return axios.put<Role, void>('http://localhost:4000/role', role).then(response => response.data);
    }
    removeRol(roleId: number) {
        return axios.delete<void>('http://localhost:4000/role', roleId).then(response => response.data);
    }
}

export let roleService = new RoleService();
