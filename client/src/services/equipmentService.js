//@flow

import axios from 'axios';

export class Equipment {
    item: string;
}

export class EventEquipment extends Equipment{
    item: string;
    amount: number;
}

class EquipmentService {
    getEquipment(): Equipment[] {
        return axios.get<Equipment[]>('http://localhost:4000/api/equipment').then(response => response.data);
    }

    getEquipmentByEvent(eventId: number): EventEquipment[] {
        return axios.get<EventEquipment[]>(`http://localhost:4000/api/equipment?event=${eventId}`).then(response => response.data);
    }

    addEquipmentToEvent(eventId: number, equipment: EventEquipment): void {
        return axios.post('http://localhost:4000/api/event/equipment',
            {event: eventId,
                  item: equipment.item,
                  amount: equipment.amount});
    }
}

export let equipmentService = new EquipmentService();
