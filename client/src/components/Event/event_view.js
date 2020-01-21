// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {Event, eventService} from "../../services/eventService";
import {Ticket} from "../../services/ticketService";
import {EventEquipment} from "../../services/equipmentService";
import {ModalWidget} from "../Modal/modal";
import {Button} from "../Buttons/buttons";
import {Alert} from "../Alert/alert";

export default class EventView extends Component {
    currentEvent: number = 0;
    eventOverview: Event = null;
    tickets: Ticket[] = [];
    eventEquipment: EventEquipment[] =[];

    state = {
        showModal: false,
        setShowModal: false
    };

    show = () => {
        this.setState({ setShowModal: true });
    };

    close = () => {
        this.setState({ setShowModal: false });
    };

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
                {!this.props.isArtist ?
                    <button
                        size="sm"
                        className="m"
                        variant="outline-secondary"
                        onClick={this.props.handleClick}>
                        Rediger arrangement
                    </button>
                : null}

                {!this.props.isArtist ?
                    <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#showModal">Avlys arrangement</button>
                    : null}

                <ModalWidget title="Advarsel" body="Er du sikker på at du vil avlyse dette arrangementet?">
                    <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Lukk</button>
                    <button type="button" className="btn btn-outline-danger" onClick={this.cancelEvent}>Avlys</button>
                </ModalWidget>

            </div>
        )

    }

    mounted(){
        this.currentEvent = this.props.eventId;
        eventService
            .getEventById(this.currentEvent)
            .then(eventOverview => (this.eventOverview = eventOverview))
            .catch((error: Error) => console.log(error.message));
    }

    cancelEvent() {

        console.log(this.eventOverview[0].event_id);

        if(!this.eventOverview) return Alert.danger("Finner ikke arrangementet");

        if (this.eventOverview[0].cancelled === 0) {

            this.currentEvent = this.props.eventId;

            eventService
                .cancelEvent(this.currentEvent)
                .then(window.location.reload())
                .then(console.log("Arrangementet er avlyst!"))
                //.then(Alert.success("Arrangementet er avlyst! Varsel er sendt på epost."))
                .catch((error: Error) => Alert.danger(error));

        } else if (this.eventOverview[0].cancelled === 1) {
            console.log("Dette arrangementet er allerede avlyst");
            //return (Alert.info("Dette arrangementet er allerede avlyst"));

        } else {
            console.log("Noe gikk galt!");
            //return Alert.danger("Noe gikk galt!");
        }

    }

}