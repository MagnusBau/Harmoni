// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {eventService, Event} from "../services/eventService";
import {Alert} from "../widgets.js";
import DateTimePicker from 'react-datetime-picker'
import DateTime from 'react-datetime';
import moment from "moment";
import { userService } from "../services/userService";
import {SimpleMap} from "../components/simplemap";
import Map from "../components/map";

const history = createHashHistory();

moment.locale("no");


export class AddEvent extends Component {
    event: Event[] = [];
    allEvents = [];
    createEvent = new Event();
    state = {
        date: new Date()
    };



    /**
     *
     * @param date
     */
    handleDate(date){
        this.setState({date});
    };

    /**
     *
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);
    }

    _onClick = ({x, y, lat, lng, event}) => console.log(x, y, lat, lng, event);

    getAddress = (dataFromChild) => {
        this.createEvent.location = dataFromChild;
        this.setState([{address: dataFromChild}]);
        console.log(dataFromChild);
    };



    render() {


        return(
            <div className={"row"}>
                <div className={"col"}>
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
                                       value={this.createEvent.location}
                                       required={true}
                                       readOnly={"readonly"}
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
                                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                            (this.createEvent.start_time = event.target.value)}
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
                                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                            (this.createEvent.end_time = event.target.value)}
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
                        </form>
                        <div className="text-center">
                            <button type="button"
                                    className="btn btn-ghost btn-ghost-bordered center-block"
                                    onClick={this.register}>
                                {' '}Registrer{' '}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"col"}>
                    <Map
                        google={this.props.google}
                        center={{lat: 63.4154, lng: 10.4055}}
                        height='300px'
                        zoom={15}
                        onChange={this.getAddress}
                    />
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
        history.push('/user/' + userService.getUserID() + '/overview');
    }


    mounted() {
        this.createEvent.organizer = userService.getUserID();
        eventService
            .getEventByName()
            .then(event => (this.allEvents  = event))
            .catch((error: Error) => Alert.danger(error.message));
    }

}