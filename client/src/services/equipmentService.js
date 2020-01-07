//@flow

import axios from 'axios';

export class Equipment {
    name: string;
}

export class EventEquipment extends Equipment{
    event: number;
    amount: number;
}

class EquipmentService {
    getEquipment(): Equipment[] {
        return axios.get<Equipment[]>('http://localhost:4000/api/equipment').then(response => response.data);
    }

    getEquipmentByEvent(eventId: number): EventEquipment[] {
        return axios.get<EventEquipment[]>(`http://localhost:4000/api/equipment?event=${eventId}`).then(response => response.data);
    }
}

export let equipmentService = new EquipmentService();
