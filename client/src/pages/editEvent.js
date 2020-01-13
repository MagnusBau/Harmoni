// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from "history";
import {eventService, Event} from "../services/eventService";
import {Alert} from "../widgets.js";

const history = createHashHistory();

export class EditEvent extends Component<{match: { params: {event_id: number}}}> {
    allEvents = [];
    event : Event[] = [];
    updateEvent = new Event();

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
                               value={this.event.title}
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
                                  value={this.event.description}
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
                               value={this.event.location}
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
                               value={this.event.start_time}
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
                               value={this.event.end_time}
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
                               value={this.event.category}
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
                               value={this.event.capacity}
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
                               value={this.event.organizer}
                               required={true}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.event.organizer = event.target.value)}
                        />
                    </div>
                </form>
                <div className="text-center">
                    <button type="button"
                            className="btn btn-ghost btn-ghost-bordered center-block"
                            onClick={this.register}>
                        {' '}Lagre{' '}
                    </button>
                </div>
            </div>
        )
    }

    register() {
        eventService
            .updateEvent(this.updateEvent)
            .then(() => {
                Alert.success('You have updated your event');
            })
            .catch((error: Error) => Alert.danger(error.message));
        history.push('/event/' + this.updateEvent.event_id);
    }

    mounted() {

        eventService
            .getEventIDUpdate(this.props.match.params.event_id)
            .then(event => (this.event = event[0]))
            .catch((error: Error) => Alert.danger(error.message));
    }
}