// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {EventService} from "../services/eventService";


const history = createHashHistory();


export class AddEvent extends Component {
    event: Event[] = []

    constructor(props, context) {
        super(props, context);
    }

    mounted() {
        EventService
            .getEventByName()
            .then(event => this.event = event)
            .catch((error:Error) => console.log(error.message));

        EventService
            .getEventID()
            .then(event => this.event = event)
            .catch((error:Error) => console.log(error.message));

        EventService.createEvent
    }

    render() {
        return(
            <div className={"m-2"}>
                <form className="form-inline">
                    <div className={"form-group m-2"}>
                        <input type={"text"}
                               className={"form-control"}
                               id={"event-title"}
                               placeholder={"Navn på arrangement"}/>
                    </div>
                    <div className={"form-group m-2"}>
                        <input type={"text"}
                               className={"form-control"}
                               id={"event-location"}
                               placeholder={"Lokasjon"}/>
                    </div>
                    <div className={"form-group m-2"}>
                        <input type={"text"}
                               className={"form-control"}
                               id={"event-description"}
                               placeholder={"Beskrivelse av arrangement"}/>
                    </div>
                    <div className={"form-group m-2"}>
                        <input type="datetime-local" id="event-start-time"
                               name="start-time" value="2020-06-12T19:30"
                               min="2020-01-01T00:00" max="2022-06-14T00:00"/>
                    </div>
                    <div className={"form-group m-2"}>
                        <input type="datetime-local" id="event-end-time"
                               name="end-time" value="2020-06-12T19:30"
                               min="2020-01-01T00:00" max="2022-06-14T00:00"/>
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
                               placeholder={"1"}/>
                    </div>
                </form>
            </div>
        )
    }

}