// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {eventService, Event} from "../services/eventService";
import {Alert} from "../widgets.js";
import DateTimePicker from 'react-datetime-picker'
import DateTime from 'react-datetime';
import moment from "moment";

const history = createHashHistory();

moment.locale("no");


export class AddEvent extends Component {
    event: Event[] = [];
    allEvents = [];
    createEvent = new Event();
    state = {
        date: new Date(),
    };

    handleDate(date){
        this.setState({date});
        this.createEvent.start_time = date;
    };

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
                               placeholder={"Navn på arrangement"}
                               required={true}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.createEvent.title = event.target.value)}/>
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Beskrivelse:</label>
                        <br></br>
                        <textarea rows={4} cols={50}
                                  className={"form-control"}
                                  id={"event-description"}
                                  placeholder={"Beskrivelse av arrangement"}
                                  required={true}
                                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                      (this.createEvent.description = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Lokasjon:</label>
                        <br></br>
                        <input type={"text"}
                               className={"form-control"}
                               id={"event-location"}
                               placeholder={"Lokasjon"}
                               required={true}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.createEvent.location = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Start tidspunkt:</label>
                        <br></br>
                        <div>
                            <DateTime
                                dateFormat={"YYYY-MM-DD"}
                                timeFormat={"HH:mm"}
                                locale={"no"}
                                onChange={this.createEvent.start_time = moment().format("YYYY-MM-DDTHH:mm:ss")}
                            />
                        </div>
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Slutt tidspunkt:</label>
                        <br></br>
                        <div>
                            <DateTime
                                dateFormat={"YYYY-MM-DD"}
                                timeFormat={"HH:mm"}
                                locale={"no"}
                                onChange={this.createEvent.end_time = moment().format("YYYY-MM-DDTHH:mm:ss")}
                            />
                        </div>
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
                               placeholder={"konsert"}
                               required={true}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.createEvent.category = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Total kapasitet:</label>
                        <br></br>
                        <input type={"text"}
                               className={"form-control"}
                               id={"ticket-amount"}
                               placeholder={"1"}
                               required={true}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.createEvent.capacity = event.target.value)}
                        />
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Organizer:</label>
                        <br></br>
                        <input type={"text"}
                               className={"form-control"}
                               id={"organizer"}
                               placeholder={"1"}
                               required={true}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.createEvent.organizer = event.target.value)}
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
        /*
        if (!this.form || !this.form.checkValidity()) {
            return Alert.danger('Please fill empty fields');
        }
        */
        eventService
            .createEvent(this.createEvent)
            .then(() => {
                Alert.success('You have created a new event!!!!');
            })
            .catch((error: Error) => Alert.danger(error.message));
        history.push(`/user/${this.createEvent.organizer}/overview`);
    }


    mounted() {
        eventService
            .getEventByName()
            .then(event => (this.allEvents  = event))
            .catch((error: Error) => Alert.danger(error.message));
    }

}