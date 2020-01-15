//@flow

import axios from 'axios';

export class Rider {
    rider_id: number;
    description: string;
    document: number;


    constructor(description: string, document: string) {
        this.description = description;
        this.document = document;
    }
}

class RiderService{

    addRider(rider : Rider): void {
        return axios.post('http://localhost:4000/api/rider', rider).then(response => response.data);
    }

    getRider(rider_id: number): Rider {
        return axios.get<Rider>(`http://localhost:4000/api/rider/one/${rider_id}`).then(response => response.data);
    }

    getAllRiders(document: number): Rider[] {
        return axios.get<Rider[]>(`http://localhost:4000/api/rider/all/${document}`).then(response => response.data);
    }

    updateRider(rider : Rider, id:number): void {
        return axios.put('http://localhost:4000/api/rider/' + id,rider).then(response => response.data);

    }

    deleteRider(rider_id: number): void {
        return axios.delete(`http://localhost:4000/api/rider/one/${rider_id}`);
    }

    deleteAllRiders(document: number): void {
        return axios.delete(`http://localhost:4000/api/rider/all/${document}`);
    }
}

export let riderService = new RiderService();