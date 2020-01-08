// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {eventService} from "../services/eventService";


const history = createHashHistory();


export class AddEvent extends Component {
    event: Event[] = []

    constructor(props, context) {
        super(props, context);
    }

    mounted() {
        eventService
            .getEventByName()
            .then(event => this.event = event)
            .catch((error:Error) => console.log(error.message));
    }

    render() {
        return(
            <div className={"m-2"}>
                <form className="form-inline">
                    
                </form>
            </div>
        )
    }

}