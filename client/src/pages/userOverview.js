// @flow
import * as React from 'react';
import {Component} from "react-simplified";
import {Event, eventService} from "../services/eventService";
import {Ticket, ticketService} from "../services/ticketService";
import {EventEquipment, equipmentService} from "../services/equipmentService";
import AddEquipment from "../components/Equipment/add_equipment";
import TicketView from "../components/Ticket/ticket_types";
import EventView from "../components/Event/event_view";
import {EventEdit} from "../components/Event/event_edit";
/**
 * Class for the view of one event
 *
 * @author Victoria Blichfeldt
 */
//TODO fikse bug med at arrangement overview ikke alltid oppdateres etter at redigering er utført
//TODO flette utstyr og dokumenter når det er ferdig
export default class UserOverview extends Component<{ match: { params: { eventId: number } } }>{
    currentUser = 0;

    constructor(props){
        super(props);
        this.state = {isEditingEvent: false}
    }

    mounted(){
//TODO get events by user
    }


    render(){
        const isEditing = this.state.isEditingEvent;


        return (
            //TODO en eller annen header for hvilken user som er logget inn
            <div className="container">
                <div className="card-columns">
                    <div className="card">
                        <img className="card-img-top img-fluid" src="" alt=""/>
                        <a href="#/event/new">
                        <div className="card-body">
                            <h5>
                                Legg til nytt arrangement
                                <img src="./img/icons/plus.svg" alt="login" width="30" height="30"/>
                            </h5>
                        </div>
                        </a>
                    </div>
                    {this.events.map(events => (
                        //TODO hente inn en <a> og sender valgt event til eventoverview
                        <div className="card">
                            <img className="card-img-top img-fluid" src="" alt=""/>
                            <div className="card-body">
                                <h5>
                                    {events.title} {events.start_time}
                                </h5>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
