//@flow

import * as React from 'react';
import {Component} from "react-simplified/lib/index";
import { createHashHistory } from 'history';
import {ticketService, Ticket, Ticket_ID} from '../../services/ticketService'



const history = createHashHistory();


export class listTicketType extends Component <{match: {params: {eventId: number, id : number}}}> {
    id_temp : number = 0;
    ticket = new Ticket_ID(
        '',
        '',
        '',
        '',
        '',
        '');

    ticketTypeList: Ticket[] = [];
    errorMessage: string = "";
    render(){
        return(
            <form>
                <div>
                    <h2>
                        Velg en billett og rediger denne
                    </h2>
                    <select
                        id="select"
                        value={this.ticket.title}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.ticket) {
                                this.ticket.title = event.target.value;
                                this.ticket.ticket_id = event.target.value;
                                this.ticket.event = event.target.value;
                            }

                        }}>
                        <option value="" hidden >Velg Billettype</option>
                        {this.ticketTypeList.map(t => (
                            <option value={t.ticket_id} key={t.title + t.ticket_id}> {t.title}</option>

                        ))}
                    </select>
                </div>

                <button onClick={this.edit} className="btn-primary m-2" type="submit">Rediger billett type</button>
                <button onClick={this.opprettSide} type={"button"}>Opprett ny billettype</button>

            </form>
        );
    }

    edit() {
        if (!this.ticket) return null;
        if (this.ticket.ticket_id === '') return null;
        if (this.ticket) history.push('/' + 'event/'+ 'edit/' + this.ticket.event + '/ticket/'+ this.ticket.ticket_id + '/edit');

    }

    mounted() {
        /*
        ticketService.getAllTicket(this.props.match.params.eventId)
            .then(t => {
                this.ticketTypeList = t[0];
            })
            .catch(error => error.message);

         */

    }

    opprettSide(){
        if (this.ticket) history.push('/' + 'event/ticket');
    }
}


export class TicketAdd extends Component{
    currentEvent: number = 0;
    ticket = new Ticket(
        '',
        '',
        '',
        '',
        ''

    );
    render(){

        if (!this.ticket) return null;
        return(
            <form ref={e => {this.form = e}} className="form-group">
                <h2>
                    Opprett en billettype
                </h2>
                <div>
                    <div>Title</div>
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


                    <button type="submit" className="btn btn-outline-success" onClick={this.send} >Legg til billett type</button>

                    <button
                        required
                        type="button"
                        size="sm"
                        className="btn btn-outline-danger"
                        variant="outline-secondary"
                        onClick={this.props.handleCancel}>
                        Avbryt
                    </button>
                </div>
            </form>
        );}
//TODO avbryt her
        mounted(){
            this.currentEvent = this.props.eventId;
            this.ticket.event = this.currentEvent;
            console.log(this.currentEvent);
        }


    send() {
        if (!this.form || !this.form.checkValidity()) return;
        if (!this.ticket) return null;
        if(this.ticket.count < 0 || this.ticket.price < 0 ) {
            alert('pris eller antall kan ikke være under 0!');
            return;
        }
        ticketService.postTicket(this.ticket)
            .then((response) => {
                if(response.error) {
                    alert(response.error);
                }else {
                    this.props.handleCancel();
                }

            })
            .catch((error: Error) => console.log(error));
    }



}

