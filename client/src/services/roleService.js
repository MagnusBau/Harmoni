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
        return axios.post<Role, void>('http://localhost:4000/role', {type: role.type, event: role.event});
    }
    assignRole(role: Role) {
        return axios.put<Role, void>('http://localhost:4000/role', {type: role.type, event: role.event});
    }
    removeRoleFromEvent(role: Role) {
        return axios.put<Role, void>('http://localhost:4000/role', {type: role.type, event: role.event});
    }
    removeRol(roleId: number) {
        return axios.delete<void>('http://localhost:4000/role', {role_id: roleId});
    }
}

export let roleService = new RoleService();
