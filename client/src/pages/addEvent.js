// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {eventService, Event} from "../services/eventService";
import {fileInfoService} from "../services/fileService"
import {Alert} from "../components/Alert/alert.js";
import DateTime from 'react-datetime';
import moment from "moment";
import { userService } from "../services/userService";

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
                    <div className="form-group m-2">
                        <label>Bilde: </label>
                        <input
                            type="file"
                            className="form-control"
                            value={this.file}
                            placeholder="Fil"
                            onChange={(e) => this.handleFile(e)}
                            required
                            accept=".png,.jpg,.jpeg,.gif"
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
                                type={'text'}
                                id={"start_time"}
                                dateFormat={"YYYY-MM-DD"}
                                timeFormat={"HH:mm"}
                                locale={"no"}
                                inputProps={{readOnly: true}}
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
            </div>
        )
    }

    register() {
        let file = this.state.file;
        let formData = new FormData();
        this.createEvent.start_time = this.state.start_time;
        this.createEvent.end_time = this.state.end_time;

        const myNewFile = new File([file], this.props.eventId + this.nameAddOn + this.name, {type: file.type});

        formData.append('file', myNewFile);

        eventService
            .createEvent(this.createEvent)
            .then(() => {
                console.log(userService.getUserId());
                eventService
                    .getLastEventByUser(userService.getUserId())
                    .then((response) => {

                        console.log(response[0].event_id);
                        const myNewFile = new File([file], "./files/" + response[0].event_id + "." + file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1), {type: file.type});

                        formData.append('file', myNewFile);
                        formData.append('image', "./files/" + response[0].event_id + "." + file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1));
                        fileInfoService.postImage(response[0].event_id, formData).then(response => {
                            if (response.data === "error") {
                                this.errorMessage = "Denne filtypen kan ikke lastes opp"
                            }

                            Alert.success('You have created a new event!!!!');
                            history.push('/user/' + userService.getUserId() + '/overview');
                        })
                    })
                    .catch((error: Error) => Alert.danger(error.message));
            })
            .catch((error: Error) => Alert.danger(error.message));
    }

    handleFile(e) {
        let file = e.target.files[0];
        this.setState({file: file});
        this.createEvent.image = file.name;
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
    }

}