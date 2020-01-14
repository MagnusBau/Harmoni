// @flow
import * as React from 'react';
import {Component} from "react-simplified";
import {Event, eventService} from "../services/eventService";
import {Ticket, ticketService} from "../services/ticketService";
import {EventEquipment, equipmentService} from "../services/equipmentService";
import AddEquipment from "../components/Equipment/add_equipment";
import TicketTypes from "../components/Ticket/ticket_types";
import EventView from "../components/Event/event_view";
import {EventEdit} from "../components/Event/event_edit";
/**
 * Class for the view of one event
 *
 * @author Victoria Blichfeldt
 */

//TODO flette utstyr og dokumenter når det er ferdig
class EventOverview extends Component<{ match: { params: { eventId: number } } }>{
    currentEvent: number = 0;
    eventOverview: Event = null;
    tickets: Ticket[] = [];
    eventEquipment: EventEquipment[] =[];
    //riders: Riders[] = [];
    //roles: Role[] = [];

    constructor(props){
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleView = this.handleView.bind(this);
        this.state = {isEditing: false}
    }

    /*
     * hvis true -> viser arrangement oversikt
     */
    handleView() {
        this.setState({isEditing: true})
    }

    /*
    * hvis true -> viser redigerigs side for arrangement
    * */
    handleEdit() {
        this.setState({isEditing: false})
    }

    mounted(){
        this.currentEvent = this.props.match.params.eventId;
        console.log("current event" + this.currentEvent);
        eventService
            .getEventID(this.currentEvent)
            .then(eventOverview => (this.eventOverview = eventOverview))
            .catch((error: Error) => console.log(error.message));

        ticketService
            .getAllTicket(this.currentEvent)
            .then(tickets => (this.tickets = tickets[0]))
            .catch((error: Error) => console.log(error.message));

        equipmentService
            .getEquipmentByEvent(this.currentEvent)
            .then(eventEquipment => this.eventEquipment = eventEquipment[0])
            .catch((error: Error) => console.log(error.message));
    }


    render(){
        const isEditing = this.state.isEditing;
        let eventContent;

        if (!this.eventOverview || !this.tickets || !this.eventEquipment) return null;

        if(isEditing) {
            eventContent = <EventEdit eventId={this.currentEvent} onClick={this.handleEdit}/>;
        }else {
            eventContent = <EventView eventId={this.currentEvent} handleClick={this.handleView}/>;
        }
        return (
            <div className="container">
                <div className="card">
                    <div>
                        <h5> {this.eventOverview[0].title}  </h5>
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs" role="tablist" id="eventOverview">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#overview" data-toggle="tab">Oversikt</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#staff" data-toggle="tab">Personell</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#ticket" data-toggle="tab">Billettyper</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#riders" data-toggle="tab">Riders</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#equipment" data-toggle="tab">Utstyr</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#documents" data-toggle="tab">Dokumenter</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content" id="eventOverviewContent">
                                <div className="tab-pane active" id="overview" role="tabpanel">
                                    {eventContent}
                                </div>
                                <div className="tab-pane" id="staff" role="tabpanel">
                                    <h5>Personell oversikt</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">role.type</li>
                                    </ul>
                                    <button
                                        size="sm"
                                        className="m"
                                        variant="outline-secondary"
                                        href={"/#/event/" +  "/staff/edit"}>
                                        Rediger personell
                                    </button>
                                </div>
                                <div className="tab-pane" id="ticket" role="tabpanel">
                                    <h5>Billettertyper</h5>
                                    <TicketTypes eventId={this.currentEvent}/>
                                </div>
                                <div className="tab-pane" id="riders" role="tabpanel">
                                    <h5>Riders</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">role.type</li>
                                    </ul>
                                    <button
                                        size="sm"
                                        className="m"
                                        variant="outline-secondary"
                                        href={"/#/event/" +  "/riders/edit"}>
                                        Rediger riders
                                    </button>
                                </div>
                                <div className="tab-pane" id="equipment" role="tabpanel">
                                    <h5>Utstyr</h5>
                                    <AddEquipment eventId={this.currentEvent}/>
                                </div>
                                <div className="tab-pane" id="documents" role="tabpanel">
                                    <h5>Dokumenter</h5>
                                    <button
                                        size="sm"
                                        className="m"
                                        variant="outline-secondary"
                                        href={"/#/event/" +  "/equipment"}>
                                        Rediger dokumenter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventOverview;