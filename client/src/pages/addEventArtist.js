// @flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {Artist, artistService} from "../services/artistService";
import {eventService, Event, Document} from "../services/eventService";
import {Modal} from 'react-bootstrap';
import {Button} from "../components/widgets";
import { createHashHistory } from 'history';
const history = createHashHistory();

// TODO: Clean up this mess

export class AddEventArtist extends Component <{ match: { params: { eventId: number } } }> {
    event: Event = new Event();
    newArtist: Artist;
    seeArtist: Artist;
    eventArtists: Artist[] = [];
    eventDocuments: Document[] = [];
    artistFilter: string = "";
    documentId: number = -1;

    state = {
        showModal: false,
        setModalShow: false,
        eventArtists: []
    };

    show = () => {
        this.setState({setModalShow: true});
    };

    close = () => {
        this.setState({setModalShow: false});
    };

    constructor(props) {
        super(props);

        this.newArtist = {
            artist_id: -1,
            artist_name: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: ""
        };

        this.seeArtist = {
            artist_id: -1,
            artist_name: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: ""
        };
    }

    mounted(): void {
        this.onComponentUpdate();
    }

    onChange(e) {
        if (e.currentTarget.id === "documentSelect") {
            this.documentId = e.target.value;
        }
        const name = e.target.name;
        this.newArtist[name] = e.target.value;
    }

    onComponentUpdate = direction => {
        artistService
            .getArtistByEvent(this.props.match.params.eventId)
            .then(artists => this.eventArtists = artists[0])
            .catch((error: Error) => console.log(error.message));

        eventService
            .getEventID(this.props.match.params.eventId)
            .then(event => this.event = event[0])
            .catch((error: Error) => console.log(error.message));

        eventService
            .getDocumentByEvent(this.props.match.params.eventId)
            .then(documents => this.eventDocuments = documents[0])
            .catch((error: Error) => console.log(error.message));
    };

    onSelect(artist: Artist) {
        this.seeArtist = artist;
    }

    onChangeFilter(e) {
        this.artistFilter = e.target.value;
    }

    removeArtist() {
        this.eventArtists = this.eventArtists.filter(artist => artist.artist_id !== this.seeArtist.artist_id);
        artistService.removeArtistFromEvent(this.event.event_id, this.seeArtist.artist_id);
        this.seeArtist = {
            artist_id: -1,
            artist_name: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: ""
        };
        this.close();
    }

    onSubmit(e) {
        e.preventDefault();
        artistService.addArtistToEvent(this.newArtist, this.documentId);
        this.eventArtists[this.eventArtists.length] = this.newArtist;
    }

    render() {
        return (
            <div>
                <div className="m-4">
                    <h2 className="m-2">Artistliste for #{this.event.event_id} ({this.event.title})</h2>
                    <div className="row">
                        <div className="col">
                            <select size="10" className="form-control m-2" id="exampleFormControlSelect1">
                                {this.eventArtists.filter(artist => artist.artist_name.includes(this.artistFilter)).map(artist =>
                                    <option value={artist} key={artist.artist_id}
                                            onClick={() => this.onSelect(artist)}>{artist.artist_name}</option>
                                )}
                            </select>
                            <input className="form-control m-2" name="filter" placeholder="Filter"
                                   value={this.artistFilter}
                                   onChange={this.onChangeFilter}/>
                        </div>
                        <div className="col">
                            <div className="card m-2">
                                <div className="card-header">
                                    Artist
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{this.seeArtist.artist_name}</h5>
                                    <p className="card-text"><b>Fullt
                                        navn: </b>{this.seeArtist.first_name + " " + this.seeArtist.last_name}</p>
                                    <p className="card-text"><b>Epost: </b>{this.seeArtist.email}</p>
                                    <p className="card-text"><b>Telefonnr.: </b>{this.seeArtist.phone}</p>
                                    {this.seeArtist.artist_name !== "" ? <p className="card-text">
                                        <a href="#"><img src="./img/icons/download.svg"/> Last ned kontrakt</a>
                                    </p> : null}
                                    {this.seeArtist.artist_name !== "" ?
                                        <button className="btn btn-danger align-bottom"
                                                onClick={this.show}>Fjern</button> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <form className="w-75 m-4" onSubmit={this.onSubmit}>
                        <h4 className="m-2">Legg til ny artist:</h4>
                        <div className="row">
                            <div className="col">
                                <input
                                    className="form-control m-2 col"
                                    name="artist_name"
                                    placeholder="Artistnavn"
                                    value={this.newArtist.artist_name}
                                    onChange={this.onChange}
                                    required/>
                            </div>
                            <div className="col">
                                <div className="m-2"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    className="form-control m-2 col"
                                    name="first_name"
                                    placeholder="Fornavn"
                                    value={this.newArtist.first_name}
                                    onChange={this.onChange}
                                    required/>
                            </div>
                            <div className="col">
                                <input className="form-control m-2 col" name="last_name" placeholder="Etternavn"
                                       value={this.newArtist.last_name} onChange={this.onChange} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input className="form-control m-2" name="email" placeholder="E-post"
                                       value={this.newArtist.email} onChange={this.onChange} required/>
                            </div>
                            <div className="col">
                                <input className="form-control m-2" name="phone" placeholder="Telefonnr."
                                       value={this.newArtist.phone} onChange={this.onChange} required/>
                            </div>
                        </div>
                        <h5 className="m-2">Legg til kontrakt</h5>
                        <div className="row">
                            <div className="col">
                                <select id="documentSelect" className="custom-select m-2" value={this.documentId}
                                        onChange={this.onChange} required>
                                    <option selected value="">Velg dokument...</option>
                                    {this.eventDocuments.map(document =>
                                        <option value={document.document_id}>{document.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="col"/>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="m-2"/>
                            </div>
                            <div className="col">
                                <button className="btn btn-success m-2 float-right" type="submit">Legg til</button>
                            </div>
                        </div>
                    </form>
                </div>
                <Modal
                    show={this.state.setModalShow}
                    onHide={this.close}
                    centered>
                    <Modal.Header>
                        <Modal.Title>Advarsel</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Er du sikker på at du vil slette kontrakten med denne artisten?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Light onClick={this.close}>Lukk</Button.Light>
                        <Button.Red onClick={this.removeArtist}>Slett</Button.Red>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}