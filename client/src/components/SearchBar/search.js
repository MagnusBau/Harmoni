// @flow

/**
 * Search components
 *
 * @author Victoria Blichfeldt
 */

import React from "react";
import { Component } from "react-simplified";
import {Event, EventService as eventService} from "../../services/eventService";

//TODO få innsendt input til upper/lower case
class Search extends Component {
    event: Event[] = [];
    input: string = "";

    render() {
        return (
            <div>
                <form className="form-inline my-2 my-lg-0 dropdown">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                        this.input = event.target.value;
                        this.mounted();
                    }} minLength={1} maxLength={40}/>
                </form>
            </div>
        );
    }

    mounted() {
        if(this.input.length > 0) {
            eventService.getEventBy(this.input)
                .then(response => {
                this.cases = [];
                response.map(e => {
                    this.event.push(e);
                });
            }).catch((error: Error) => console.log(error.message));
        } else {
            this.event = [];
        }
    }
    view = (event) => {
        let id = event.target.getAttribute('event_id');
        history.push("/event/" + id)
    };
    search = (event) => {
        this.input = event.target.getAttribute('author');
        this.mounted();
    };
}

export default Search;