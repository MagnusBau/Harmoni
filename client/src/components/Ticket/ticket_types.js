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

    constructor(props){
        super(props);
    };

    render(){
        return (

                <div className="container">

                <button type="submit" className="btn-success m-2"
                    onClick={this.props.handleAddTicketClick}>
                    Legg til billettype
                </button>



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
                            <button type="submit" className="btn-primary m-2"
                                onClick={() => {this.props.triggerParentUpdate(tickets.ticket_id); this.props.handleEditTicketClick()}}>
                                Rediger billett
                            </button>

                            <button className="btn-danger" onClick={() => {this.delete(tickets.ticket_id); } } type={"button"}>Slett</button>

                        </li>
                        </div>
                    ))}

                    </Row>




                </div>
        )

    }

    delete(currentTicketID){
        ticketService.removeTicket(currentTicketID).then(() => {
            if (this.ticket) this.props.handleDelete();
            window.location.reload()
        }).catch(error => error.message);

    }

    mounted(){
        this.currentEvent = this.props.eventId;
        this.currentTicketID = this.props.ticketId;
        ticketService
            .getAllTicket(this.currentEvent)
            .then(tickets => (this.tickets = tickets[0]))
            .catch((error: Error) => console.log(error.message));


    }

}