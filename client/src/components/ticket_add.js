

import * as React from 'react';
import ReactDOM from 'react-dom';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
import {ticketService, ticket} from '../services/ticketService'

const history = createHashHistory();


export class addTicketType extends Component <{match: {params: {id: number}}}> {

    ticketTypeList: ticket[] = [];
    ticket = new ticket(
        '',
        '',
        '',
        0,
        0,

    );
    render(){
        return(
            <div>
                <div>Bilett </div>

                    <select
                        required
                        aria-required={"true"}
                        value={this.ticket.title}
                        id="select"
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.ticket) this.ticket.title = event.target.value;
                        }}>

                        <option key={"bilettType"} defaultValue="default" hidden >Velg Bletttype</option>
                        {this.ticketTypeList.map(t => (
                            <option key={t.title + t.ticket_id} value={t.title}>{t.title}</option>
                        ))}
                    </select>
                </div>

        );
    }
    mounted(){
        ticketService.getAllTicket().then(ticketTypeList => this.ticketTypeList = ticketTypeList).catch((error: Error) => console.log(error.message));

    }
}

