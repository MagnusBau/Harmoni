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
        eventService.getEventBy(this.input).then(response => {
            this.events = response;
            response.map(e => {
                this.events.push(e);
            });
        }).catch((error: Error) => console.log(error.message));
    }
    viewEvent(e){
        history.push("/event/" + e + "/view")
    }
    render() {
        return (
            <div className="container">
                <div className="card-columns">
                    {this.events.map(events => (
                        <div className="card" onClick={() => this.viewEvent(events.event_id)}>
                            <img className="card-img-top img-fluid" src="" alt=""/>
                            <div className="card-body">
                                <h5>
                                    {events.title} {events.start_time}
                                </h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}