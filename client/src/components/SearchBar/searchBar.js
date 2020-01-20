// @flow

/**
 * SearchBar components
 *
 * @author Victoria Blichfeldt
 */

import * as React from "react";
import { Component } from "react-simplified";
import { EventSearch, eventService} from "../../services/eventService";
import {createHashHistory} from "history";
const history = createHashHistory();

//TODO legge til egen søk side, slik at når trykker enter så kommer siden opp
export class SearchBar extends Component {
    events: EventSearch[] = [];

    input: string = "";

    render() {
        return (
            <div className="dropdown show">
                <input className="form-control mr-sm-2 dropdown-toggle" type="text" value={this.input} placeholder="Search" id="search"
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    this.input = event.target.value;
                    this.mounted();
                }} minLength={1} maxLength={40} data-toggle="dropdown" onKeyPress={this.ifEnter}/>
                <div className="dropdown-menu">
                    <div className="list-group list-group-flush">
                        {this.events.map( event => (
                            <button onKeyPress={this.ifEnterInList} onClick={() => history.push("/event/" + event.event_id + "/visit")} type="button" className="list-group-item list-group-item-action dropdown-item">{event.title}</button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }


    mounted() {
        if(this.input.length > 0) {
            eventService.getEventBy(this.input).then(response => {
                this.events = [];
                response[0].map(e => {
                    this.events.push(e);
                });
            }).catch((error: Error) => console.log(error.message));
        } else {
            this.events = [];
        }
    }

    ifEnter = (event) => {
        if(event.key === 'Enter'){
            console.log("enter");
            history.push("/event/search/" + this.input);
        }
    };

    ifEnterInList = (event) => {
        if(event.key === 'Enter'){
            console.log("enter");
            history.push("/event/" + event.event_id + "/visit");
        }
    };

    view = (event) => {
        let id = event.target.getAttribute('event_id');
        history.push("/event/" + id)
    };

    search = (event) => {
        this.input = event.target.getAttribute('author');
        this.mounted();
    };
}