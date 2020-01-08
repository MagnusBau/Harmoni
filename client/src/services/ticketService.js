// @flow
import axios from "axios";


export class ticket {
    ticket_id: number;
    title: string;
    info: string;
    price: number;
    count: number;

    constructor(ticket_id: number, title: string, info: string, price: number, count: number) {
        this.ticket_id = ticket_id;
        this.title = title;
        this.info = info;
        this.price = price;
        this.count = count;
    }
}

class TicketService{
    getAllTicket(){
        return axios.get<ticket[]>('/ticket').then(response => response.data);
    }

    postTicket(ticket: ticket){
        return axios.post('/ticket', ticket).then(response => response.data);
    }

    updateTicket(ticket: ticket, id : number){
        return axios.put('/ticket/' + id, ticket).then(response => response.data);
    }
}

export let ticketService = new TicketService();