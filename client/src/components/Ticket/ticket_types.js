import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {Ticket_ID, ticketService} from "../../services/ticketService";
import {Event} from "../../services/eventService";
import {EventEquipment} from "../../services/equipmentService";
import Row from "react-bootstrap/Row";

export default class TicketView extends Component {
    currentTicketID : number = 0;
    currentEvent: number = 0;
    eventOverview: Event = null;
    tickets: Ticket_ID[] = [];
    eventEquipment: EventEquipment[] =[];
    errorMessage: string = "";

    constructor(props){
        super(props);
    };

    render(){
        return (

                <div className="container">
                <div style={{textAlign:"center"}}>
                    <h2>Dine billettyper</h2>
                </div>
                <Row>
                {this.tickets.map( (tickets =>
                    <div className="card" style={{width : "33%", marginBottom:"5%"}}>
                        <li style={{float:"left", width:"100%",height:"100%", border:"none"}} className="list-group-item">
                            <b>Type:</b>
                            <hr/>
                            <p>{tickets.title}</p>

                            <b>Billettinfo</b>
                            <hr/>
                            <p>{tickets.info}</p>

                            <b>Pris:</b>
                            <hr/>
                            <p>{tickets.price + 'kr'} </p>

                            <b>Antall billetter:</b>
                            <hr/>
                            <p>{tickets.count}</p>
                            {!this.props.isArtist ?
                                <Row>
                                    <button type="submit" className="btn btn-outline-primary"
                                        onClick={() => {this.props.triggerParentUpdate(tickets.ticket_id); this.props.handleEditTicketClick()}}>
                                        Rediger billett</button>
                                    <button className="btn btn-outline-danger" onClick={() => {this.delete(tickets.ticket_id); } } type={"button"}>Slett</button>
                                </Row>
                            : null}
                        </li>
                    </div>
                ))}
                </Row>
                {!this.props.isArtist ?
                    <div style={{textAlign:"right"}}>
                        <button type="submit" className="btn btn-outline-success m-2"
                            onClick={this.props.handleAddTicketClick}>
                            Legg til ny billettype
                        </button>
                    </div>
                : null}
            </div>
        )
    }

    delete(currentTicketID){
        ticketService.removeTicket(currentTicketID).then((response) => {
            if (this.ticket) this.props.handleDelete();
            this.mounted();
        }).catch(error => error.message);

    }

    mounted(){
        this.currentEvent = this.props.eventId;
        this.currentTicketID = this.props.ticketId;
        ticketService
            .getAllTicket(this.currentEvent)
            .then(tickets => {
                this.tickets = tickets[0];
                if(tickets.body.error) {
                    this.errorMessage = tickets.body.error;
                }
            })
            .catch((error: Error) => error.message);


    }

}