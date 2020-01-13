// @flow

import axios from 'axios';

export class Role {
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
        return axios.get<Role[]>('http://localhost:4000/event/role').then(response => response.data);
    }
    getEventRoles(eventId: number): EventRole[] {
        return axios.get<EventRole[]>('http://localhost:4000/event/role/' + eventId).then(response => response.data);
    }
    createRole(role: Role) {
        return axios.post<Role, void>('http://localhost:4000/event/role', {type: role.type, event: role.event});
    }
    assignRole(role: EventRole) {
        return axios.put<EventRole, void>('http://localhost:4000/event/role', {role: role.role, event: role.event});
    }
    removeRoleFromEvent(role: EventRole) {
        return axios.put<EventRole, void>('http://localhost:4000/event/role', {role: role.role, event: role.event});
    }
    removeRole(roleId: number) {
        return axios.delete('http://localhost:4000/event/role', {role_id: roleId});
    }
    updateRoleCount(role: EventRole) {
        return axios.put<EventRole, void>('http://localhost:4000/event/role', {role: role.role, event: role.event, count: role.count});
    }
}

export let roleService = new RoleService();
