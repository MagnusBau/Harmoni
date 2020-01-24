//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {Event, eventService, CreateEvent} from "../../services/eventService";
import DateTime from "react-datetime";
import moment from "moment";
import {Alert} from "../Alert/alert";
import {fileInfoService} from "../../services/fileService";
import Map from "../../components/map";

const history = createHashHistory();

moment.locale("no");

export class EventEdit extends Component {
    currentEvent: number = 0;
    allEvents = [];
    event = new Event();
    updateEvent = new CreateEvent();
    categories: string[] = [];

    state = {
        start_time: moment(),
        end_time: moment(),
        location: ''
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
                <div className={"row"}>
                    <div className={"col"}>
                        <form className="form-inline" onSubmit={this.onSubmit}>
                            <div className={"form-group m-2"}>
                                <label>Navn på arrangement:</label>
                                <br/>
                                <input type={"text"}
                                       className={"form-control"}
                                       id={"event-title"}
                                       defaultValue={this.event.title}
                                       required
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                           (this.event.title = event.target.value)}/>
                            </div>
                            <div className={"form-group m-2"}>
                                <label>Beskrivelse:</label>
                                <br/>
                                <textarea rows={4} cols={50}
                                          className={"form-control"}
                                          id={"event-description"}
                                          defaultValue={this.event.description}
                                          required
                                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                              (this.event.description = event.target.value)}
                                />
                            </div>
                            <div className={"form-group m-2"}>
                                <label>Start tidspunkt:</label>
                                <br/>
                                <div>
                                    <DateTime
                                        id={"start_time"}
                                        dateFormat={"YYYY-MM-DD"}
                                        timeFormat={"HH:mm"}
                                        value={this.state.start_time}
                                        locale={"no"}
                                        inputProps={{readOnly: true}}
                                        onChange={this.handleStartTime}
                                    />
                                </div>
                            </div>
                            <div className={"form-group m-2"}>
                                <label>Slutt tidspunkt:</label>
                                <br/>
                                <div>
                                    <DateTime
                                        id={"end_time"}
                                        dateFormat={"YYYY-MM-DD"}
                                        timeFormat={"HH:mm"}
                                        value={this.state.end_time}
                                        locale={"no"}
                                        inputProps={{readOnly: true}}
                                        onChange={this.handleEndTime}
                                    />
                                </div>
                            </div>
                            <div className={"form-group m-2"}>
                                <label>Type arrangement:</label>
                                <br/>
                                <select
                                    required
                                    name={"category"} className="custom-select w-25"
                                    onChange={event => this.event.category = event.target.value}
                                    value={this.event.category}>
                                    <option selected value="">Velg kategori...</option>
                                    {this.categories.map(category =>
                                        <option value={category.name}>{category.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className={"form-group m-2"}>
                                <label>Total kapasitet:</label>
                                <br/>
                                <input type={"number"}
                                       className={"form-control"}
                                       id={"ticket-amount"}
                                       defaultValue={this.event.capacity}
                                       required
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                           (this.event.capacity = event.target.value)}
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
                                    accept=".png,.jpg,.jpeg,.gif"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit"
                                    className="btn btn-outline-dark center-block"
                                >
                                    {' '}Lagre{' '}
                                </button>
                                <button
                                    size="sm"
                                    className="m btn btn-outline-dark center-block"
                                    variant="outline-secondary"
                                    onClick={this.props.handleClickCancel}>
                                    Avbryt
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    onChangeAddress(address) {
        this.event.location = address;
    }

    onSubmit(e) {
        e.preventDefault();
        let file = this.state.file;
        let formData = new FormData();
        this.event.start_time = this.state.start_time;
        this.event.end_time = this.state.end_time;

        eventService
            .updateEvent(this.currentEvent, this.event)
            .then(() => {
                if(this.state.file !== null){
                    const myNewFile = new File([file], "./files/" + this.currentEvent + "." + file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1), {type: file.type});
                    formData.append('file', myNewFile);
                    fileInfoService.deleteFile(btoa(this.event.image)).then(res => {
                        fileInfoService.updateImage(formData).then(res => {
                            Alert.success('You have updated your event');
                            window.location.reload();
                        })
                    })
                }
            })
            .catch((error: Error) => Alert.danger(error.message));
        /*history.push('/event/' + JSON.parse(this.updateEvent.event_id));*/
    }

    handleFile(e) {
        let file = e.target.files[0];
        this.setState({file: file});
    }

    mounted() {
        this.currentEvent = this.props.eventId;
        eventService
            .getEventIDUpdate(this.currentEvent)
            .then(event =>  {
                this.event = event[0][0];
                this.event.start_time = moment(this.event.start_time).format('YYYY-MM-DD HH:mm');
                this.event.end_time = moment(this.event.end_time).format('YYYY-MM-DD HH:mm');
                console.log(this.event.start_time);
                console.log(this.event.end_time);
                this.setState({location: this.event.location,
                                     start_time: this.event.start_time,
                                     end_time: this.event.end_time});
            })
            .catch((error: Error) => alert(error.message));
        eventService
            .getCategories()
            .then(categories => this.categories = categories[0])
            .catch((error: Error) => alert(error.message));
    }
}