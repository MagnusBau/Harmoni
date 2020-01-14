//@flow

import axios from 'axios';

export class Equipment {
    item: string;
}

export class EventEquipment extends Equipment{
    event: number;
    equipment: number;
    item: string;
    amount: number;
}

class EquipmentService {
    getEquipment(): Equipment[] {
        return axios.get<Equipment[]>(`http://localhost:4000/api/equipment`).then(response => response.data);
    }

    getEquipmentByEvent(eventId: number): EventEquipment[] {
        return axios.get<EventEquipment[]>(`http://localhost:4000/api/equipment/${eventId}`).then(response => response.data);
    }

    addEquipmentToEvent(eventId: number, equipment: Equipment, amount: number): void {
        return axios.post(`http://localhost:4000/api/event/${eventId}/equipment`,
            {item: equipment.item,
                amount: amount});
    }

    removeEquipmentFromEvent(eventEquipment: EventEquipment): void {
        return axios.delete(`http://localhost:4000/api/event/${eventEquipment.event}/equipment/${eventEquipment.equipment}`);
    }

    updateEquipmentOnEvent(eventEquipment: EventEquipment): void {
        return axios.put(`http://localhost:4000/api/event/${eventEquipment.event}/equipment/${eventEquipment.equipment}`,
            {amount: eventEquipment.amount});
    }
}

export let equipmentService = new EquipmentService();
