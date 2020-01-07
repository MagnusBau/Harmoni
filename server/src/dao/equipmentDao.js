// @flow

const Dao = require("./dao.js");

export class EquipmentDAO extends Dao {
    constructor(pool) {
        super(pool);
    }

    /**
     * Inserts a new piece of equipment
     * @param name
     * @param callback
     */
    insertEquipment(name: string, callback: (status: string, data: string) => void) {
        let values = [name];
        super.query("CALL insert_equipment(?)",
            values,
            callback);
    }

    /**
     * Deletes a specified piece of equipment
     * @param equipmentId
     * @param callback
     */
    deleteEquipment(equipmentId: number, callback: (status: string, data: string) => void) {
        let values = [equipmentId];
        super.query("CALL delete_equipment(?)",
            values,
            callback);
    }

    /**
     * Fetches all equipment in the database
     * @param callback
     */
    getAllEquipment(callback: (status: string, data: string) => void) {
        super.query("CALL get_all_equipment()",
                [],
                callback);
    }

    /**
     * Get one piece of equipment by id
     * @param equipment_id
     * @param callback
     */
    getEquipmentById(equipment_id: number, callback: (status: string, data: string) => void) {
        let values = [equipment_id];
        super.query("CALL get_equipment_by_id(?)",
                values,
                callback);
    }

    /**
     * Get equipment by a name search
     * @param name
     * @param callback
     */
    getEquipmentByName(name: string, callback: (status: string, data: string) => void) {
        let values = [name];
        super.query("CALL get_equipment_by_name(?)",
                values,
                callback);
    }
}
