// @flow

const DAO = require("./dao.js");

export class roleDAO extends DAO {
    /**
     * Inserts a new role
     * @param type
     * @param event
     * @param callback
     */
    createRole(type: string, event: number, callback: (status: string, data: string) => void) {
        let newRole = [type, event];
        super.query("CALL set_role(?, ?)", newRole, callback);
    }

    /**
     * Returns all available roles
     * @param callback
     */
    getRoles(callback: (status: string, data: string) => void){
        super.query("CALL get_all_roles()", [], callback);
    }

    /**
     * Returns roles assigned to event
     * @param event
     * @param callback
     */
    getRolesInEvent(event: number, callback: (status: string, data: string) => void){
        super.query("CALL get_roles_in_event(?)", [event], callback);
    }

    /**
     * Assigns role to event
     * @param role
     * @param event
     * @param count
     * @param callback
     */
    assignToEvent(role: number, event: number, count: number, callback: (status: string, data: string) => void){
        let roleEvent = [role, event, count];
        super.query("CALL assign_to_event(?, ?, ?)", roleEvent, callback);
    }

    /**
     * Removes role from event
     * @param role
     * @param event
     * @param callback
     */
    removeFromEvent(role: number, event: number, callback: (status: string, data: string) => void){
        let remove = [role, event];
        super.query("CALL remove_from_event(?, ?)", remove, callback);
    }

    /**
     * Removes role completely
     * @param role_id
     * @param callback
     */
    removeRole(role_id: number, callback: (status: string, data: string) => void){
        super.query("CALL remove_role(?)", [role_id], callback);
    }

    /**
     * Updates count of specified role
     * @param role_id
     * @param event
     * @param count
     * @param callback
     */
    updateRoleCount(role_id: number, event: number, count: number, callback: (status: string, data: string) => void){
        let update = [role_id, event, count];
        super.query("CALL update_role_count(?, ?, ?)", update, callback);
    }
}