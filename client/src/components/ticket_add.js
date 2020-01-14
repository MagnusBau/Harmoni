//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
import {ticketService, Ticket, Ticket_ID} from '../services/ticketService'

const history = createHashHistory();


export class listTicketType extends Component <{match: {params: {id: number}}}> {
    id_temp : number = 0;
    ticket = new Ticket_ID(
        '',
        '',
        '',
        '',
        '');

    ticketTypeList: Ticket[] = [];
    render(){
        return(
            <form>
                <div>
                    <h2>
                        Velg en bilett og rediger denne
                    </h2>
                    <select
                        id="select"
                        value={this.ticket.title}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.ticket) {
                                this.ticket.title = event.target.value;
                                this.ticket.ticket_id = event.target.value;
                            }

                        }}>
                        <option value="" hidden >Velg Bletttype</option>
                        {this.ticketTypeList.map(t => (
                            <option value={t.ticket_id} key={t.title + t.ticket_id}> {t.title}</option>

                        ))}
                    </select>
                </div>
                <button onClick={this.edit} type={"button"}>rediger bilett type</button>
            </form>
        );
    }

    edit() {
        if (!this.ticket) return null;
        if (this.ticket.ticket_id === '') return null;
        if (this.ticket) history.push('/' + this.ticket.ticket_id + '/' + 'rediger');


        }

    mounted(){
       // ticketService.getArticleId(1).then(t => (this.ticket = t[0])).catch((error: Error) => console.log(error.message));
        ticketService.getAllTicket()
            .then(t => {
                this.ticketTypeList = t[0];
            })
            .catch(error => error.message);
    }
}


export class addTicketType extends Component <{match: {params: {id: number}}}> {
    ticket = new Ticket(
        '',
        '',
        '',
        '',

    );
    render(){
        if (!this.ticket) return null;
        return(
        <form ref={e => {this.form = e}}>
            <h2>
                Opprett en bilett type
            </h2>
            <div>
                <div>Title</div>
                <div>
                    <input
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
                        type="number"
                        value={this.ticket.count}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.ticket) this.ticket.count = event.target.value;
                        }}
                    />
                </div>

                <button onClick={this.send} type={"button"}>legg til bilett type</button>
            </div>
        </form>
        );}



    send() {
      if (!this.form || !this.form.checkValidity()) return;
      if (!this.ticket) return null;
      if(this.ticket.count < 0 || this.ticket.price < 0 ) {
          alert('pris eller antall kan ikke være under 0!');
          return;
      }
      ticketService.postTicket(this.ticket)
          .then(() => {
              if(this.ticket) {
                  history.push('/');
                  window.location.reload();
              }
          })
          .catch((error: Error) => console.log(error.message));
  }
    mounted(){
        ticketService.getAllTicket()
            .then(t => {
                this.ticketTypeList = t[0];
            })
            .catch(error => error.message);

    }

}

export class editTicketType extends Component <{match: {params: {id: number}}}> {
    ticketTypeList: Ticket[] = [];
    ticket = new Ticket(
        '',
        '',
        '',
        '',

    );


    render() {
        if (!this.ticket) return null;
        return (


            <form>

                <div>title</div>
                <div>
                    <input
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
                        type="number"
                        value={this.ticket.count}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.ticket) this.ticket.count = event.target.value;
                        }}
                    />
                </div>

                <button onClick={this.save} type={"button"}>Save</button>
                <button onClick={this.delete} type={"button"}>delete</button>
            </form>
        );
    }

    mounted() {
        ticketService.getTicketId(this.props.match.params.id).then(t => (this.ticket = t[0][0])).catch((error: Error) => console.log(error.message));
    }

    delete(){
        if(!this.ticket) return null;

        ticketService.removeTicket(this.props.match.params.id).then(() => {
            if (this.ticket) history.push('/');
        }).catch(error => error.message);
    }

    save() {
        if (!this.ticket) return null;
        if(this.ticket.count < 0 || this.ticket.price < 0 ) {
            alert('pris eller antall kan ikke være under 0!');
            return;
        }
        ticketService.updateTicket(this.ticket, this.props.match.params.id).then(() => {
            if (this.ticket) history.push('/');
        }).catch(error => error.message);
    }
}






