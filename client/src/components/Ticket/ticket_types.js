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
                        <li className="list-group-item">
                            <h5>Type</h5>
                            <p>{ticket.title}</p>
                            <h5>Billettinfo</h5>
                            <p>{ticket.info}</p>
                            <h5>Pris</h5>
                            <p>{ticket.price}</p>
                            <h5>Antall</h5>
                            <p>{ticket.count}</p>
                        </li>
                    ))}
                </ul>

                <button
                    size="sm"
                    className="m"
                    variant="outline-secondary"
                    href={"/#/event/" + "/tickets/edit"}>
                    Rediger billetter
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
}