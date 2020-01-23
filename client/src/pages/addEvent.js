// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {eventService, Event} from "../services/eventService";
import {Alert} from "../components/Alert/alert.js";
import DateTime from 'react-datetime';
import moment from "moment";
import { userService } from "../services/userService";
import Map from "../components/map";

const history = createHashHistory();

moment.locale("no");

export class AddEvent extends Component {
    event: Event[] = [];
    allEvents = [];
    categories: string[] = [];
    createEvent = new Event();
    state = {
        start_time: new moment(),
        end_time: new moment()
    };

    handleStartTime(moment){
        this.setState({
            start_time: moment.format("YYYY-MM-DDTHH:mm:ss"),
        })
    };

    handleEndTime(moment) {
        this.setState({
            end_time: moment.format("YYYY-MM-DDTHH:mm:ss")
        });
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            address: props.currentAddress,
            start_date: new Date(),
            end_date: new Date()
        };
        //this.handleChange = this.handleChange.bind(this);
    }

    _onClick = ({x, y, lat, lng, event}) => console.log(x, y, lat, lng, event);

    getAddress = (dataFromChild) => {
        this.createEvent.location = dataFromChild;
        this.setState([{address: dataFromChild}]);
        console.log(dataFromChild);
    };



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
                        <label>Start tidspunkt:</label>
                        <br></br>
                        <div>
                            <DateTime
                                type={'text'}
                                id={"start_time"}
                                dateFormat={"YYYY-MM-DD"}
                                timeFormat={"HH:mm"}
                                locale={"no"}
                                inputProps={{readOnly: true, required: true}}
                                onChange={this.handleStartTime}
                            />
                        </div>
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Slutt tidspunkt:</label>
                        <br></br>
                        <div>
                            <DateTime
                                id={"end_time"}
                                dateFormat={"YYYY-MM-DD"}
                                timeFormat={"HH:mm"}
                                locale={"no"}
                                inputProps={{readOnly: true}}
                                onChange={this.handleEndTime}
                            />
                        </div>
                    </div>
                    <div className={"form-group m-2"}>
                        <label>Type arrangement:</label>
                        <br></br>
                        <select name={"category"} className="custom-select w-25"
                                onChange={event => this.createEvent.category = event.target.value}
                                value={this.createEvent.category}>
                            <option selected value="">Velg kategori...</option>
                            {this.categories.map(category =>
                                <option value={category.name}>{category.name}</option>
                            )}
                        </select>
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
                    <button type="submit"
                            className="btn btn-ghost btn-ghost-bordered center-block"
                            onClick={this.register}>
                        {' '}Registrer{' '}
                    </button>
                </div>
                <div className={"col"}>
                    <Map
                        google={this.props.google}
                        center={{lat: 63.4154, lng: 10.4055}}
                        height='300px'
                        zoom={15}
                        getAddress={this.getAddress}
                        onChange={this.onChangeAddress}
                    />
                </div>
            </div>

        )
    }

    onChangeAddress(address: string) {
        this.createEvent.location = address;
    }

    register() {
        this.createEvent.start_time = this.state.start_time;
        this.createEvent.end_time = this.state.end_time;
        eventService
            .createEvent(this.createEvent)
            .then(() => {
                Alert.success("addEventAlert",'You have created a new event!!!!');
                history.push('/user/' + userService.getUserId() + '/overview');
            })
            .catch((error: Error) => Alert.danger(error.message));
    }


    mounted() {
        this.createEvent.organizer = userService.getUserId();
        eventService
            .getEventByName()
            .then(event => (this.allEvents  = event))
            .catch((error: Error) => Alert.danger(error.message));
        eventService
            .getCategories()
            .then(categories => this.categories = categories[0])
            .catch((error: Error) => error.message);

        this.setState({address: this.props.currentAddress});
    }

}