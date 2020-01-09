// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {EventService, CreateEvent} from "../services/eventService";
import {Alert} from "../widgets";


const history = createHashHistory();


export class AddEvent extends Component {
    event: Event[] = [];
    allEvents = [];
    createEvent = new CreateEvent();

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return(
            <div className={"m-2"}>
                <form className="form-group">
                    <div className={"form-group m-2"}>
                        <input type={"text"}
                               className={"form-control"}
                               id={"event-title"}
                               placeholder={"Navn på arrangement"}
                               required={true}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.createEvent.title = event.target.value)}/>
                    </div>
                    <div className={"form-group m-2"}>
                        <input type={"text"}
                               className={"form-control"}
                               id={"event-location"}
                               placeholder={"Lokasjon"}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.createEvent.location = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <input type={"text"}
                               className={"form-control"}
                               id={"event-description"}
                               placeholder={"Beskrivelse av arrangement"}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.createEvent.description = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <input type="datetime-local" id="event-start-time"
                               name="start-time" value="2020-06-12T19:30"
                               min="2020-01-01T00:00" max="2022-06-14T00:00"
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.createEvent.start_time = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <input type="datetime-local" id="event-end-time"
                               name="end-time" value="2020-06-12T19:30"
                               min="2020-01-01T00:00" max="2022-06-14T00:00"
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.createEvent.end_time = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <select name={"ticket-types"} size={"5"}>
                            <option value={"1"}>1</option>
                            <option value={"2"}>2</option>
                            <option value={"3"}>3</option>
                            <option value={"4"}>4</option>
                            <option value={"5"}>5</option>
                        </select>
                    </div>
                    <div className={"form-group m-2"}>
                        <input type={"text"}
                               className={"form-control"}
                               id={"ticket-amount"}
                               placeholder={"1"}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.createEvent.capacity = event.target.value)}
                        />
                    </div>
                </form>
                <div className="text-center">
                    <button type="button"
                            className="btn btn-ghost btn-ghost-bordered center-block"
                            onClick={this.register}>
                        {' '}Registrer{' '}
                    </button>
                </div>
            </div>
        )
    }

    register() {
        if (!this.form || !this.form.checkValidity()) {
            return Alert.danger('Please fill empty fields');
        }
        EventService
            .createEvent(this.createEvent)
            .then(() => {
                Alert.success('You have created a new article!!!!');
            })
            .catch((error: Error) => Alert.danger(error.message));
    }


    mounted() {
        /*EventService
            .getEventByName()
            .then(event => (this.allEvents  = event))
            .catch((error: Error) => Alert.danger(error.message));*/
    }

}