import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {Event, eventService, CreateEvent} from "../../services/eventService";


const history = createHashHistory();

export class EventEdit extends Component {
    currentEvent: number = 0;
    allEvents = [];
    event = new Event();
    updateEvent = new CreateEvent();

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return(
            <div className={"m-2"}>
                <form className="form-group">
                    <div className={"form-group m-2"}>
                        <label>Navn på arrangement:</label>
                        <br></br>
                        <input type={"text"}
                               className={"form-control"}
                               id={"event-title"}
                               defaultValue={this.event.title}
                               required={true}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.event.title = event.target.value)}/>
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Beskrivelse:</label>
                        <br></br>
                        <textarea rows={4} cols={50}
                                  className={"form-control"}
                                  id={"event-description"}
                                  defaultValue={this.event.description}
                                  required={true}
                                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                      (this.event.description = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Lokasjon:</label>
                        <br></br>
                        <input type={"text"}
                               className={"form-control"}
                               id={"event-location"}
                               defaultValue={this.event.location}
                               required={true}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.event.location = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Start tidspunkt:</label>
                        <br></br>
                        <input type="datetime-local" id="event-start-time"
                               required={true}
                               name="start-time"
                               defaultValue={this.event.start_time}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.event.start_time = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Slutt tidspunkt:</label>
                        <br></br>
                        <input type="datetime-local" id="event-end-time"
                               required={true}
                               name="end-time"
                               defaultValue={this.event.end_time}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.event.end_time = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Antall billettyper:</label>
                        <br></br>
                        <select name={"ticket-types"} size={"1"}>
                            <option value={"1"}>1</option>
                            <option value={"2"}>2</option>
                            <option value={"3"}>3</option>
                            <option value={"4"}>4</option>
                            <option value={"5"}>5</option>
                        </select>
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Type arrangement:</label>
                        <br></br>
                        <input type={"text"}
                               className={"form-control"}
                               id={"category"}
                               defaultValue={this.event.category}
                               required={true}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.event.category = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Total kapasitet:</label>
                        <br></br>
                        <input type={"text"}
                               className={"form-control"}
                               id={"ticket-amount"}
                               defaultValue={this.event.capacity}
                               required={true}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.event.capacity = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Organizer:</label>
                        <br></br>
                        <input type={"text"}
                               className={"form-control"}
                               id={"organizer"}
                               defaultValue={this.event.organizer}
                               required={true}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.event.organizer = event.target.value)}
                        />
                    </div>
                </form>
                <div className="text-center">
                    <button type="button"
                            className="btn btn-outline-dark center-block"
                            onClick ={() => {this.props.onClick(); this.update()}}>
                        {' '}Lagre{' '}
                    </button>
                    <button
                        size="sm"
                        className="m"
                        variant="outline-secondary"
                        onClick={this.props.handleClickCancel}>
                        Avbryt
                    </button>
                </div>
            </div>
        )
    }

    update() {
        eventService
            .updateEvent(this.currentEvent, this.event)
            .then(() => {
                Alert.success('You have updated your event');
                this.props.reload();
            })
            .catch((error: Error) => Alert.danger(error.message));
        /*history.push('/event/' + JSON.parse(this.updateEvent.event_id));*/
    }

    mounted() {
        this.currentEvent = this.props.eventId;
        eventService
            .getEventIDUpdate(this.currentEvent)
            .then(event => (this.event = event[0][0]))
            .catch((error: Error) => Alert.danger(error.message));
    }
}