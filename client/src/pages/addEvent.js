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
import set from "@babel/runtime/helpers/esm/set";

const history = createHashHistory();

moment.locale("no");

const [value, setValue] = React.useState(new Date());

export class AddEvent extends Component {
    event: Event[] = [];
    allEvents = [];
    createEvent = new Event();
    state = {
        start_date: new Date(),
        end_date: new Date()
    };



    handleChange(date) {
        this.setState({ start_date: date });

    }



    /**
     *
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);
        this.state = {
            start_date: new Date(),
            end_date: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
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
                                        value={this.state.start_date}
                                        onChange={this.handleChange}
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
                                        onChange={this.props.handleEndTime}
                                    />
                                </div>
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
                        getAddress={this.getAddress}
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
        this.createEvent.start_time = this.state.start_date;
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