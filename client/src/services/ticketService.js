// @flow
import axios from 'axios';
import { userService } from "../services/userService";


export class Ticket_ID {
    ticket_id: number;
    title: string;
    info: string;
    price: number;
    count: number;
    event : number;


    constructor(ticket_id : number, title: string, info: string, price: number, count: number, event : number) {
        this.ticket_id = ticket_id;
        this.title = title;
        this.info = info;
        this.price = price;
        this.count = count;
        this.event = event;
    }
}


export class Ticket {

    title: string;
    info: string;
    price: number;
    count: number;
    event: number;


    constructor( title: string, info: string, price: number, count: number, event : number) {

        this.title = title;
        this.info = info;
        this.price = price;
        this.count = count;
        this.event = event;
    }
}
class TicketService{
    getAllTicket(event : number){
        return axios.get<Ticket[]>('http://localhost:4000/auth/:id/ticket/all/' + event).then(response => response.data, {
            'headers': {
                'x-access-token': userService.getToken()
            }});
    }

    getTicketId(id: number) {
        return axios.get<Ticket[]>('http://localhost:4000/auth/:id/ticket/' + id).then(response => response.data, {
            'headers': {
                'x-access-token': userService.getToken()
            }});
    }

    postTicket(ticket: Ticket){
        return axios.post('http://localhost:4000/auth/:id/ticket', ticket).then(response => response.data, {
            'headers': {
                'x-access-token': userService.getToken()
            }});
    }

    updateTicket(ticket: Ticket, id : number){
        return axios.put('http://localhost:4000/auth/:id/ticket/' + id, ticket).then(response => response.data, {
            'headers': {
                'x-access-token': userService.getToken()
            }});
    }

    removeTicket(id: number) {
        return axios.delete<Ticket>('http://localhost:4000/auth/:id/ticket/' + id).then(response => response.data, {
            'headers': {
                'x-access-token': userService.getToken()
            }});
    }


}

export let ticketService = new TicketService();