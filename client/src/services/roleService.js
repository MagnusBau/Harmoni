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
        return axios.get<EventRole[]>('http://localhost:4000/api/role/event/' + eventId).then(response => response.data);
    }
    createRole(role: Role): void {
        return axios.post('http://localhost:4000/api/role', role).then(response => response.data);
    }
    assignRole(role: EventRole): void {
        return axios.post('http://localhost:4000/api/event/' + role.event, role).then(response => response.data);
    }
    removeRoleFromEvent(role: EventRole): void {
        console.log(role.role_id);
        console.log(role.event);
        return axios.delete('http://localhost:4000/api/role/event/' + role.event, role).then(response => response.data);
    }
    removeRole(roleId: number): void {
        console.log(roleId);
        return axios.delete('http://localhost:4000/api/roler', roleId).then(response => response.data);
    }
    updateRoleCount(role: EventRole): void {
        console.log(role.event);
        return axios.put('http://localhost:4000/api/role/' + role.event, {count: role.count}).then(response => response.data);
    }
}

export let roleService = new RoleService();
