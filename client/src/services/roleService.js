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
    event: number;
}

class RoleService {
    getAllRoles() {
        return axios.get<Role[]>('http://localhost:4000/api/role').then(response => response.data);
    }
    getEventRoles(eventId: number): EventRole[] {
        return axios.get<EventRole[]>('http://localhost:4000/api/role/event/' + eventId, eventId).then(response => response.data);
    }
    createRole(role: Role): void {
        return axios.post('http://localhost:4000/api/role', role).then(response => response.data);
    }
    assignRole(role: EventRole): void {
        return axios.post('http://localhost:4000/api/event/' + role.event, role).then(response => response.data);
    }
    removeRoleFromEvent(role: EventRole): void {
        return axios.put('http://localhost:4000/api/role/event/' + role.event, role).then(response => response.data);
    }
    removeRole(roleId: number): void {
        return axios.delete('http://localhost:4000/api/roler', roleId).then(response => response.data);
    }
    updateRoleCount(role: EventRole): void {
        return axios.put('http://localhost:4000/api/role/' + role.event, role).then(response => response.data);
    }
}

export let roleService = new RoleService();
