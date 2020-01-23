//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
import {ticketService, Ticket, Ticket_ID} from '../../services/ticketService'



const history = createHashHistory();
export class TicketEdit extends Component {
    currentTicketID = 0;
    ticketTypeList: Ticket[] = [];
    userForm: any = null;
    ticket = new Ticket(
        '',
        '',
        '',
        '',
        ''
    );
    errorMessage: string="";

    render() {
        if (!this.ticket) return null;
        return (

            <form ref={e => (this.userForm = e)}>
                <div>title</div>
                <div>
                    <input
                        required
                        className="form-control"
                        type="text"
                        value={this.ticket.title}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.ticket) this.ticket.title = event.target.value;
                        }}
                    />
                </div>


                <div>info</div>
                <div>
                    <input
                        required
                        className="form-control"
                        type="text"
                        value={this.ticket.info}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.ticket) this.ticket.info = event.target.value;
                        }}
                    />
                </div>


                <div>price</div>
                <div>
                    <input
                        required
                        className="form-control"
                        type="number"
                        value={this.ticket.price}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.ticket) this.ticket.price = event.target.value;
                        }}
                    />
                </div>

                <div>count</div>
                <div>
                    <input
                        required
                        className="form-control"
                        type="number"
                        value={this.ticket.count}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.ticket) this.ticket.count = event.target.value;
                        }}
                    />
                </div>
                <button
                    className="btn btn-outline-success"
                    onClick={() => {this.save(); }}
                    type={"submit"}>
                    Lagre
                </button>
                <button className="btn btn-outline-danger"
                        onClick={() => {this.delete();}}
                        type={"button"}>Slett
                </button>
                <button
                    className="btn btn-outline-danger"
                    onClick={this.props.handleCancel}
                    type={"button"}>
                    Avbryt
                </button>
            </form>
        );
    }

    mounted() {
        this.currentEventID = this.props.eventId;
        this.currentTicketID = this.props.ticketId;
        console.log(this.currentTicketID);
        ticketService
            .getTicketId(this.currentTicketID)
            .then((response) => {
                this.ticket = response[0][0];
            })
            .catch((error: Error) => console.log(error.message));
    }

    delete(){
        if(!this.ticket) return null;

        ticketService.removeTicket(this.currentTicketID).then((response) => {
            if (this.ticket) this.props.handleDelete();
        }).catch(error => error.message);
    }

    save() {
        if (!this.ticket|| !this.userForm.checkValidity()) return null;
        if(this.ticket.count < 0 || this.ticket.price < 0 ) {
            alert('pris eller antall kan ikke være under 0!');
            return;
        }
        ticketService.updateTicket(this.ticket, this.currentTicketID).then((response) => {
            if (this.ticket) this.props.handleCancel();
        }).catch(error => error.message);
    }
}
