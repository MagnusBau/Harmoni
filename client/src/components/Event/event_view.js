import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {Event, eventService} from "../../services/eventService";
import {Ticket} from "../../services/ticketService";
import {EventEquipment} from "../../services/equipmentService";
import {ModalWidget, Button} from "../widgets";
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
                <button
                    size="sm"
                    className="m"
                    variant="outline-secondary"
                    onClick={this.props.handleClick}>
                    Rediger arrangement
                </button>

                <Button.Red onClick={this.show}>Avlys arrangement</Button.Red>

                <ModalWidget show={this.state.setShowModal} onHide={this.close} title="Advarsel" body="Er du sikker på at du vil avlyse dette arrangementet?">
                    <Button.Light onClick={this.close}>Lukk</Button.Light>
                    <Button.Red onClick={this.cancelEvent}>Avlys</Button.Red>
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
        if(!this.eventOverview[0]) return null;

        //console.log(this.props.match.params.eventId + ": " + this.event[0].title);

        if(this.eventOverview[0].cancelled === 0) {

            this.currentEvent = this.props.eventId;

            eventService
                .cancelEvent(this.currentEvent)
                //.then(Alert.success("Arrangementet er avlyst! Email sendt."))
                .then(console.log("Arrangementet er avlyst!"))
                .then(history.push("/"))
                .catch((error: Error) => Alert.danger(error));

        } else if (this.eventOverview.cancelled === 1) {

            console.log("Dette arrangementet er allerede avlyst");
            //return (Alert.info("Dette arrangementet er allerede avlyst"));

        } else {

            console.log("Noe gikk galt!");
            //return Alert.danger("Noe gikk galt!");
        }

    }
}