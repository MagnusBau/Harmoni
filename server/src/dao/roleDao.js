// @flow

const DAO = require("./dao.js");

export class roleDAO extends DAO {
    /**
     * Inserts a new role
     * @param json
     * @param callback
     */
    createRole(json: Object, callback: (status: string, data: string) => void) {
        let newRole = [json.type, json.event];
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
     * @param event_id
     * @param callback
     */
    getStaffInEvent(event_id: number, callback: (status: string, data: string) => void){
        super.query("CALL get_staff_in_event(?)", [event_id], callback);
    }

    /**
     * Assigns role to event
     * @param json
     * @param callback
     */
    assignToEvent(json: Object, callback: (status: string, data: string) => void){
        let roleEvent = [json.role_id, json.event];
        super.query("CALL assign_to_event(?, ?)", roleEvent, callback);
    }

    /**
     * Removes role from event
     * @param json
     * @param callback
     */
    removeFromEvent(json: Object, callback: (status: string, data: string) => void){
        let remove = [json.role.id, json.event];
        super.query("CALL remove_from_event(?, ?)", remove, callback);
    }

    /**
     * Removes role completely
     * @param role_id
     * @param callback
     */
    removeRole(role_id: number, callback: (status: string, data: string) => void){
        super.query("CALL remove_role(?)", role_id, callback);
    }
}