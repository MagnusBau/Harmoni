//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {Event, eventService, CreateEvent} from "../../services/eventService";
import DateTime from "react-datetime";
import moment from "moment";
import {Alert} from "../Alert/alert";

const history = createHashHistory();

moment.locale("no");

export class EventEdit extends Component {
    currentEvent: number = 0;
    allEvents = [];
    event = new Event();
    updateEvent = new CreateEvent();
    categories: string[] = [];

    state = {
        start_time: new moment(),
        end_time: new moment()
    };

    constructor(props, context) {
        super(props, context);
    }

    handleStartTime(moment){
        this.setState({
            start_time: moment.format("YYYY-MM-DDTHH:mm:ss"),
        });
    };

    handleEndTime(moment) {
        this.setState({
            end_time: moment.format("YYYY-MM-DDTHH:mm:ss")
        });
    }

    render() {
        return(
            <div className={"m-2"}>
                <Alert/>
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
                        <div>
                            <DateTime
                                id={"start_time"}
                                dateFormat={"YYYY-MM-DD"}
                                timeFormat={"HH:mm"}
                                value={this.event.start_time}
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
                                value={this.event.end_time}
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
                                onChange={event => this.event.category = event.target.value}
                                value={this.event.category}>
                            <option selected value="">Velg kategori...</option>
                            {this.categories.map(category =>
                                <option key={category.name} value={category.name}>{category.name}</option>
                            )}
                        </select>
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

                <div className="text-center">
                    <button type="submit"
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
                </form>
            </div>
        )
    }

    update() {
        this.event.start_time = this.state.start_time;
        this.event.end_time = this.state.end_time;
        eventService
            .updateEvent(this.currentEvent, this.event)
            .then(() => {
                this.props.reload();
                Alert.success('You have updated your event');
            })
            .catch((error: Error) => Alert.danger(error.message));
        /*history.push('/event/' + JSON.parse(this.updateEvent.event_id));*/
    }

    mounted() {
        this.currentEvent = this.props.eventId;
        eventService
            .getEventIDUpdate(this.currentEvent)
            .then(event =>  {
                this.event = event[0][0];
                this.event.start_time = moment(this.event.start_time).format('YYYY-MM-DD HH:mm');
                this.state.start_time = this.event.start_time;
                this.event.end_time = moment(this.event.end_time).format('YYYY-MM-DD HH:mm');
                this.state.end_time = this.event.end_time;
                console.log(this.event.start_time);
                console.log(this.event.end_time)
            })
            .catch((error: Error) => Alert.danger(error.message));
        eventService
            .getCategories()
            .then(categories => this.categories = categories[0])
            .catch((error: Error) => Alert.danger(error.message));
    }
}