// @flow
import axios from 'axios';


export class Ticket {
    ticket_id: number;
    title: string;
    info: string;
    price: number;
    count: number;

    constructor(title: string, info: string, price: number, count: number) {
        this.title = title;
        this.info = info;
        this.price = price;
        this.count = count;
    }
}

class TicketService{
    getAllTicket(){
        return axios.get<Ticket[]>('/ticket').then(response => response.data);
    }

    getTicketId(id: number) {
        return axios.get<Ticket[]>('http://localhost:4000/ticket/' + id).then(response => response.data);
    }

    postTicket(ticket: Ticket){
        return axios.post('http://localhost:4000/ticket', ticket).then(response => response.data);
    }

    updateTicket(ticket: Ticket, id : number){
        return axios.put('http://localhost:4000/ticket/' + id, ticket).then(response => response.data);
    }

    removeTicket(id: number) {
        return axios.delete<Ticket>('http://localhost:4000/ticket/' + id).then(response => response.data);
    }




}

export let ticketService = new TicketService();