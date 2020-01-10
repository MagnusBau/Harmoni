//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
import {ticketService, Ticket} from '../services/ticketService'

const history = createHashHistory();


export class listTicketType extends Component <{match: {params: {id: number}}}> {

    ticketTypeList: Ticket[] = [];
    render(){
        return(
            <form>
                <div>Bilett </div>
                <div>
                <select>
                        <option value="" hidden >Velg Bletttype</option>
                        {this.ticketTypeList.map(t => (

                            <option value={t.title} key={t.title + t.ticket_id}> {t.title} </option>
                        ))}
                    </select>
                </div>
                </form>

        );
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
                            if (this.ticket) this.ticket.price = Number.parseInt(event.target.value);
                        }}
                    />
                </div>

                <div>count</div>
                <div>
                    <input
                        type="number"
                        value={this.ticket.count}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.ticket) this.ticket.count = Number.parseInt(event.target.value);
                        }}
                    />
                </div>

                <button onClick={this.send} type={"button"}>Add ticket Type</button>
            </div>
        </form>
        );}



    send() {
      if (!this.form || !this.form.checkValidity()) return;
      if (!this.ticket) return null;
      ticketService.postTicket(this.ticket)
          .then(() => {
              if(this.ticket) history.push('/')
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
                            if (this.ticket) this.ticket.price = Number.parseInt(event.target.value);
                        }}
                    />
                </div>

                <div>count</div>
                <div>
                    <input
                        type="number"
                        value={this.ticket.count}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.ticket) this.ticket.count = Number.parseInt(event.target.value);
                        }}
                    />
                </div>

                <button onClick={this.save} type={"button"}>Save</button>
                <button onClick={this.delete} type={"button"}>delete</button>
            </form>
        );
    }

    mounted() {
        ticketService.getTicketId(this.props.match.params.id).then(t => (this.ticket = t[0])).catch((error: Error) => console.log(error.message));
    //    ticketService.getAllTicket().then(t => {this.ticketTypeList = t[0];}).catch(error => error.message);
    }

    delete(){
        if(!this.article) return null;

        ticketService.removeTicket(this.props.match.params.id).then(() => {
            if (this.article) history.push('/');
        }).catch(error => error.message);
    }

    save() {
        if (!this.article) return null;
        ticketService.updateTicket(this.ticket, this.props.match.params.id).then(() => {
            if (this.article) history.push('/' + this.props.match.params.id);
        }).catch(error => error.message);
    }
}






