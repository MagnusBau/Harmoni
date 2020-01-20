//@flow
/*
import * as React from 'react';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
const history = createHashHistory();
import Modal from 'react-bootstrap/Modal';
import { riderService, Rider} from "../services/riderService";
import { Row, Column} from "../widgets";
import Autosuggest from 'react-autosuggest';
import {Ticket, ticketService} from "../services/ticketService";



export class RiderCard extends Component <{rider_id: React.Node, description: React.Node, url: React.Node}> {
    show = false;
    render(){
        return(
            <div className="row justify-content-center">
                <div className="card mb-4" style={{width: '50%'}}>
                    <div id={"card"} className="card-img-overlay"></div>
                    <div className="card-body">
                        <div className="card-text" style={{whiteSpace: 'pre-line'}}>{this.props.description}</div>
                        <br/>
                        <Row>
                            <Column width={2}>
                                <button type="button" className="btn btn-info" onClick={this.edit}>
                                    Rediger
                                </button>
                            </Column>
                            <Column>
                                <button type="button" className="btn btn-danger" onClick={this.handleShow}>
                                    Slett
                                </button>
                            </Column>
                        </Row>
                    </div>
                </div>
                <Modal show={this.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Er du sikker på at du vil slette denne Rideren?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={this.handleClose}>
                            Avbryt
                        </button>
                        <button type="button" className="btn btn-danger" onClick={this.delete}>
                            Slett
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    handleShow(){
        this.show = true;
    }
    handleClose(){
        this.show = false;
        window.location.reload()
    }
    edit(){
        history.push(this.props.url + "/edit/" + String(this.props.rider_id))
    }

    delete(){
        riderService
            .deleteRider(parseInt(this.props.rider_id))
            .then((response) => {
                console.log("Rider deleted");
                this.handleClose();
            })
            .catch((error: Error) => console.error(error.message));
    }
}

export class RiderList extends Component<{match : {params: {eventId: number, description : number, documentId: number}}}>{
    riders: Rider[] = [];
    url: string = "";
    render(){

        return(

            <div>
                <AddRiderType description = {this.props.match.params.description} documentId = {this.props.match.params.documentId}/>
                {this.riders.map(r => (
                    <RiderCard rider_id={r.rider_id} description={r.description} url={this.url} key={r.rider_id}/>
                ))}

            </div>
        );
    }

    mounted(){
        this.url = this.props.match.url;
        riderService
            .getAllRiders(this.props.match.params.documentId)
            .then(riders => {
                this.riders = riders[0];
            })
            .catch((error: Error) => console.error(error.message));
    }
}


export class RiderEdit extends Component<{match : {params: {riderId: number, eventId: number, documentId: number}}}>{
    errorMessage: string = "";
    rider: Rider = new Rider(
        '',
        ''
    );
render(){

    console.log( this.props.match.params.documentId);
        return(
            <div className="row justify-content-center">
                <div className="mb-4 border-0 " style={{width: '75%'}}>
                    <div className="card-body">
                        <form ref={e => (this.form = e)}>
                            <label htmlFor="basic-url">Tekst: </label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                </div>

                                <textarea
                                    className="form-control"
                                    required
                                    minLength={1}
                                    maxLength={100}
                                    aria-label="tekst"
                                    rows="10"
                                    value={this.rider.description}
                                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>{
                                        (this.rider.description = event.target.value);
                                        this.rider.document = this.props.documentId;}}>
                                </textarea>
                            </div>
                        </form>

                    </div>
                    <button type="button" className="btn btn-info" onClick={this.update}>
                        Rediger
                    </button>
                    <p style={{color: "red"}}>{this.errorMessage}</p>
                    <button onClick={this.toBack} type={"button"}>go toBack</button>
                </div>
            </div>
        )
    }
    update(){
        if(!this.form || !this.form.checkValidity()){
            this.errorMessage = "Fyll ut de røde feltene";
            this.mounted();
        }else{
            riderService
                .updateRider(this.rider, this.props.match.params.riderId)
                .then((response) => {
                    window.location.reload()
                }, console.log("Rider oppdatert"))
                .then(history.push('/event/edit/' + this.props.match.params.eventId + '/document/' + this.props.match.params.documentId + '/riders'))
                .catch((error: Error) => console.error(error.message));
        }
    }
    mounted() {
        riderService.getRider(this.props.match.params.riderId).then(t => (this.rider = t[0][0])).catch((error: Error) => console.log(error.message));
    }
    toBack(){
    history.goBack();
    }
}


export class AddRiderType extends Component<{ description: React.Node, documentId: React.Node}>{
    rider = new Rider(
        '',
        ''
    );

    render(){

        if (!this.rider) return null;
        return(
            <form ref={e => {this.form = e}}>

                <h2>
                    Opprett en rider
                </h2>

                <div>
                    <div>Description</div>
                    <div>
                        <input
                            type="text"
                            value={this.rider.description}
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                if (this.rider) this.rider.description = event.target.value;
                                this.rider.document = this.props.documentId;
                            }}
                        />
                    </div>



                    <button onClick={this.send} type={"button"}>legg til rider</button>
                </div>
            </form>
        );}



    send() {
        if (!this.form || !this.form.checkValidity()) return;
        if (!this.rider) return null;
        console.log(this.rider.description, this.props.documentId);
        riderService.addRider(this.rider).then(() => {
            if(this.rider) {
                window.location.reload();
            }
        }).catch((error: Error) => console.log(error.message));
    }
    mounted(){

    }

}

*/
