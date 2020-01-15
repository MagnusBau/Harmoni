// @flow

import axios from 'axios';

export class Role {
    role_id: number;
    type: string;
    event: number;
}
export class EventRole extends Role{
    role: number;
    count: number;
}

class RoleService {
    getAllRoles() {
        return axios.get<Role[]>('http://localhost:4000/api/role').then(response => response.data);
    }
    getEventRoles(eventId: number): EventRole[] {
        return axios.get<EventRole[]>('http://localhost:4000/api/event/' + eventId + '/role').then(response => response.data);
    }
    createRole(role: Role): void {
        console.log(role.type);
        return axios.post('http://localhost:4000/api/role',
            {type: role.type, event: role.event}).then(response => response.data);
    }
    assignRole(role: EventRole): void {
        return axios.post('http://localhost:4000/api/event/' + role.event + '/role',
            {role: role.role_id, event: role.event, count: role.count}).then(response => response.data);
    }
    removeRoleFromEvent(role: EventRole): void {
        return axios.delete('http://localhost:4000/api/event/' +
            role.event + '/role/' + role.role_id).then(response => response.data);
    }
    removeRole(roleId: number): void {
        return axios.delete('http://localhost:4000/api/role/' + roleId).then(response => response.data);
    }
    updateRoleCount(role: Object): void {
        return axios.put('http://localhost:4000/api/event/' + role.event + '/role',
            {role_id: role.role_id, event: role.event, count: role.count}).then(response => response.data);
    }
}

export let roleService = new RoleService();
