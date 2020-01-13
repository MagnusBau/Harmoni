// @flow

import axios from 'axios';

export class Role {
    type: string;
    event: number;
}
export class EventRole extends Role{
    role: number;
    event: number;
}

class RoleService {
    getAllRoles() {
        return axios.get<Role[]>('http://localhost:4000/event/role').then(response => response.data);
    }
    getEventRoles(eventId: number) {
        return axios.get<Role[]>('http://localhost:4000/event/role?event=$' + eventId).then(response => response.data);
    }
    createRole(role: Role) {
        return axios.post<Role, void>('http://localhost:4000/event/role', {type: role.type, event: role.event});
    }
    assignRole(role: EventRole) {
        return axios.put<Role, void>('http://localhost:4000/event/role', {role: role.role, event: role.event});
    }
    removeRoleFromEvent(role: EventRole) {
        return axios.put<Role, void>('http://localhost:4000/event/role', {role: role.role, event: role.event});
    }
    removeRole(roleId: number) {
        return axios.delete('http://localhost:4000/event/role', {role_id: roleId});
    }
}

export let roleService = new RoleService();
