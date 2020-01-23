// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {eventService, Event} from "../services/eventService";
import {Alert} from "../components/Alert/alert.js";
import DateTime from 'react-datetime';
import moment from "moment";
import {userService} from "../services/userService";
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

    handleStartTime(moment) {
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


        return (
            <div className={"m-2"}>
                <form className="form-inline" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div classname="col">
                            <div className="text-center">
                                <div className={"form-group m-2"}>
                                    <label>Navn på arrangement:</label>
                                    <br></br>
                                    <input
                                        required
                                        type={"text"}
                                        className={"form-control"}
                                        id={"event-title"}
                                        placeholder={"Navn på arrangement"}
                                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                            (this.createEvent.title = event.target.value)}/>
                                </div>
                                <div className={"form-group m-2"}>
                                    <label>Beskrivelse:</label>
                                    <br></br>
                                    <textarea
                                        required
                                        rows={4} cols={50}
                                        className={"form-control"}
                                        id={"event-description"}
                                        placeholder={"Beskrivelse av arrangement"}

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
                                            inputProps={{readOnly: true}}
                                            onChange={this.handleStartTime}
                                            closeOnSelect={true}

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
                                            closeOnSelect={true}

                                        />
                                    </div>
                                </div>
                                <div className={"form-group m-2"}>
                                    <label>Type arrangement:</label>
                                    <br></br>
                                    <select
                                        required
                                        name={"category"}
                                        className="custom-select w-25"
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
                                    <input
                                        required
                                        type="number"
                                        className={"form-control"}
                                        id={"ticket-amount"}
                                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                            (this.createEvent.capacity = event.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Registrer</button>
                            </div>
                        </div>
                        <div className={"col"}>
                            <Map
                                center={{lat: 63.4154, lng: 10.4055}}
                                google={this.props.google}
                                height='300px'
                                zoom={15}
                                onChange={this.onChangeAddress}
                                getAddress={this.getAddress}
                            />
                        </div>
                    </div>
                </form>
            </div>

    )
    }

    onChangeAddress(address: string) {
        this.createEvent.location = address;
    }

    onSubmit(e) {
        e.preventDefault();

        this.createEvent.start_time = this.state.start_time;
        this.createEvent.end_time = this.state.end_time;
        console.log(typeof this.createEvent.start_time  === typeof this.createEvent.end_time);
        console.log(this.createEvent.start_time + 100 < this.createEvent.end_time);

        if (typeof this.createEvent.start_time  === typeof this.createEvent.end_time && this.createEvent.start_time + 100 < this.createEvent.end_time) {
        e.preventDefault();
        eventService
        .createEvent(this.createEvent)
        .then((response) => {
        Alert.success("addEventAlert",'You have created a new event!!!!');
        history.push('/user/' + userService.getUserId() + '/overview');
    })
        .catch((error: Error) => Alert.danger(error.message));
    } else {
        e.preventDefault();
        if(this.createEvent.start_time + 100 >= this.createEvent.end_time){
        return alert("start må være før slutt!");
    }else{
        e.preventDefault();
        return alert("Du må fylle ut event start og slutt!");
    }

    }

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