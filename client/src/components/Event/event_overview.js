import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {Event, eventService} from "../../services/eventService";
import {Ticket} from "../../services/ticketService";
import {EventEquipment} from "../../services/equipmentService";

export default class Event_Overview extends Component {
    currentEvent: number = 0;
    eventOverview: Event = null;
    tickets: Ticket[] = [];
    eventEquipment: EventEquipment[] =[];

    render(){
        //TODO legge til error melding hvis eventen ikke kommer opp/finnes
        if (!this.eventOverview) return null;

        return (
            <div>
                <h3>{this.eventOverview[0].title}</h3>
                <h5>Beskrivelse:</h5>
                <p>{this.eventOverview[0].description}</p>
                <h5>Kategori</h5>
                <p>{this.eventOverview[0].category}</p>
                <h5>Sted</h5>
                <p>{this.eventOverview[0].location}</p>
                <h5>Tidspunkt</h5>
                <p>Fra: {this.eventOverview[0].start_time}
                    <br/>Til: {this.eventOverview[0].end_time}</p>
                <h5>Kapasitet</h5>
                <p>{this.eventOverview[0].capacity}</p>
                <button
                    size="sm"
                    className="m"
                    variant="outline-secondary"
                    onClick={this.handleClick}>
                    Rediger arrangement
                </button>
            </div>
        )

    }

    mounted(){
        this.currentEvent = this.props.eventId;
        eventService
            .getEventByID(this.currentEvent)
            .then(eventOverview => (this.eventOverview = eventOverview))
            .catch((error: Error) => console.log(error.message));
    }

    handleClick() {

    }
}