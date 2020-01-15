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
import {editTicketType, addTicketType, listTicketType} from"../components/ticket_add";
import AddRole from "../components/Staff/staff_overview"
import {roleService} from "../services/roleService";
/**
 * Class for the view of one event
 *
 * @author Victoria Blichfeldt
 */
//TODO fikse bug med at arrangement overview ikke alltid oppdateres etter at redigering er utført
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
        this.state = {
            isEditingEvent: false,
            isEditingTicket: false
        }
    }

    /*
     * hvis true -> viser arrangement oversikt
     */
    handleView() {
        this.setState({isEditingEvent: true})
    }

    /*
    * hvis true -> viser redigerigs side for arrangement
    * */
    handleEdit() {
        this.setState({
            isEditingEvent: false,
        })
    }

    mounted(){
        this.currentEvent = this.props.match.params.eventId;
        console.log("current event" + this.currentEvent);
        eventService
            .getEventById(this.currentEvent)
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
        const isEditingEvent = this.state.isEditingEvent;
        const isEditingTicket = this.state.isEditingTicket;
        let eventContent;
        let ticketContent;

        if (!this.eventOverview || !this.tickets || !this.eventEquipment) return null;

        if(isEditingEvent) {
            eventContent = <EventEdit eventId={this.currentEvent} onClick={this.handleEdit} handleClickCancel={this.handleEdit}/>;
        }else {
            eventContent = <EventView eventId={this.currentEvent} handleClick={this.handleView}/>;
        }

        if(isEditingTicket){
            ticketContent = <editTicketType/>
        }else {
            ticketContent = <TicketTypes eventId={this.currentEvent}/* handleClick={} handleAddTicketClick={}*//>
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
                                    <AddRole eventId={this.currentEvent}/>
                                </div>
                                <div className="tab-pane" id="ticket" role="tabpanel">
                                    <h5>Billettertyper</h5>
                                    {ticketContent}
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