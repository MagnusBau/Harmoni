// @flow

import * as React from "react";
import {Component} from "react-simplified";
import {Event, eventService} from "../services/eventService";
import {createHashHistory} from "history";

const history = createHashHistory();

export class EventSearch extends Component<{match: {params: {input: string}}}> {
    events: Event[] = [];
    input: string = "";

    mounted(){
        this.input = this.props.match.params.input;
        eventService.getEventBy(this.input)
            .then(events => this.events = events[0])
            .catch((error: Error) => console.log(error.message));
    }
    viewEvent(e){
        history.push("/event/" + e + "/view")
    }
    render() {
        console.log(this.events);
        return (
            <div>
                <div className="image-header">
                    <img src="./img/several-people-at-a-party-1540338.jpg" alt="" width="100%" height="auto"/>
                </div>
                <div className="container mt-4">
                    <div className="card-columns">
                        {this.events.map(events => (
                            <div className="card" onClick={() => this.viewEvent(events.event_id)}>
                                <img className="card-img-top img-fluid" src="./img/happy-faces-2231989.jpg" alt="happy faces"/>
                                <div className="card-body">
                                    <h5>
                                        {events.title} {events.start_time}
                                    </h5>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}