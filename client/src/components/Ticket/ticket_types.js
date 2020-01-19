import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {Ticket_ID, ticketService} from "../../services/ticketService";
import {Event} from "../../services/eventService";
import {EventEquipment} from "../../services/equipmentService";

export default class TicketView extends Component {
    currentEvent: number = 0;
    eventOverview: Event = null;
    tickets: Ticket_ID[] = [];
    eventEquipment: EventEquipment[] =[];

    constructor(props){
        super(props);
    };

    render(){
        //TODO bruke samme table som i riders/personell
        return (
            <div>
                <h5>Billettyper</h5>
                <ul className="list-group list-group-flush">
                    {this.tickets.map( (tickets =>
                        <li className="list-group-item">
                            <b>Type:</b>
                            <p>{tickets.title}</p>
                            <b>Billettinfo</b>
                            <p>{tickets.info}</p>
                            <b>Pris:</b>
                            <p>{tickets.price}</p>
                            <b>Antall:</b>
                            <p>{tickets.count}</p>
                            <button
                                size="sm"
                                className="m"
                                variant="outline-secondary"
                                onClick={() => {this.props.triggerParentUpdate(tickets.ticket_id); this.props.handleEditTicketClick()}}>
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
}