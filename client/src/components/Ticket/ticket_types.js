import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {Ticket, ticketService} from "../../services/ticketService";
import {Event} from "../../services/eventService";
import {EventEquipment} from "../../services/equipmentService";

export default class TicketTypes extends Component {
    currentEvent: number = 0;
    eventOverview: Event = null;
    tickets: Ticket[] = [];
    eventEquipment: EventEquipment[] =[];

    render(){

        return (
            <div>
                <ul className="list-group list-group-flush">
                    {this.tickets.map( (ticket =>
                        <li className="list-group-item" key={ticket.ticket_id}>
                            <b>Type:</b>
                            <p>{ticket.title}</p>
                            <b>Billettinfo</b>
                            <p>{ticket.info}</p>
                            <b>Pris:</b>
                            <p>{ticket.price}</p>
                            <b>Antall:</b>
                            <p>{ticket.count}</p>
                            <button
                                size="sm"
                                className="m"
                                variant="outline-secondary"
                                onClick={() => {this.props.handleClick(); this.edit()}}>
                                Rediger billett
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    size="sm"
                    className="m"
                    variant="outline-secondary"
                    onClick={this.props.handleAddTicketClick}>
                    Legg til billettype
                </button>
            </div>
        )

    }

    mounted(){
        this.currentEvent = this.props.eventId;
        ticketService
            .getAllTicket(this.currentEvent)
            .then(tickets => (this.tickets = tickets[0]))
            .catch((error: Error) => console.log(error.message));
    }

    edit() {
        if (!this.ticket) return null;
        if (this.ticket.ticket_id === '') return null;
        //if (this.ticket) history.push('/' + 'event/'+ 'edit/' + this.ticket.event + '/ticket/'+ this.ticket.ticket_id + '/edit');
    }
}