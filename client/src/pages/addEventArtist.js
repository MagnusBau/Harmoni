// @flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {Artist, artistService} from "../services/artistService";
import {eventService, Event, Document} from "../services/eventService";
import {Modal} from 'react-bootstrap';
import {Button} from "../components/Buttons/buttons";
import {userService} from "../services/userService";

export class AddEventArtist extends Component {
    event: Event = new Event();
    newArtist: Artist;
    seeArtist: Artist;
    eventArtists: Artist[] = [];
    eventDocuments: Document[] = [];
    artistFilter: string = "";
    documentId: number = -1;
    isArtist: boolean = true;

    /**
     * Constructor
     * @param props
     */
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

        this.state = {
            showRemoveWarning: false,
            showConfirmAddUser: false,
            eventArtists: []
        };
    }

    mounted(): void {
        this.fetchData();
    }

    /**
     * Updates all component data from the database
     */
    fetchData() {
        this.eventArtists = [];
        eventService
            .getEventById(this.props.eventId)
            .then(event => this.event = event[0])
            .catch((error: Error) => console.log(error.message));

        artistService
            .getArtistByEvent(this.props.eventId)
            .then(artists => this.eventArtists = artists[0])
            .catch((error: Error) => console.log(error.message));

        this.setState({eventArtists: []}, () => {
            artistService
                .getArtistByEvent(this.props.eventId)
                .then(artists => this.setState({eventArtists: artists[0]}))
                .catch((error: Error) => console.log(error.message));
        });

        eventService
            .getDocumentByEvent(this.props.eventId)
            .then(documents => this.eventDocuments = documents[0])
            .catch((error: Error) => console.log(error.message));
    }

    /**
     * Shows a modal dialog window
     * @param e Component triggering the dialog
     */
    show(e) {
        if (e.target.id === "showWarning") {
            this.setState({showRemoveWarning: true});
        } else if (e.target.id === "showAddUser") {
            this.setState({showConfirmAddUser: true});
        }
    };

    /**
     * On form data change
     * @param e
     */
    onChange(e) {
        switch (e.currentTarget.id) {
            case "documentSelect":
                this.documentId = e.target.value;
                break;
            case "artistFilter":
                this.artistFilter = e.target.value;
                break;
            default:
                const name = e.target.name;
                this.newArtist[name] = e.target.value;
                break;
        }
    }

    /**
     * Called whenever the artist list is clicked
     * @param artist Artist object that was clicked on
     */
    onSelect(artist: Artist) {
        this.seeArtist = artist;
    }

    /**
     * Removes an artist from the event
     * @param e
     */
    removeArtist(e) {
        artistService
            .removeArtistFromEvent(this.event.event_id, this.seeArtist.artist_id)
            .then(this.fetchData());
        this.seeArtist = {
            artist_id: -1,
            artist_name: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: ""
        };
        this.setState({showRemoveWarning: false});
    }

    /**
     * Adds a user to the selected artist if none exist
     * @param e
     */
    addArtistUser(e) {
        userService
            .generateArtistUser(this.seeArtist.artist_name, this.seeArtist.first_name, this.seeArtist.last_name,
                                this.seeArtist.phone, this.seeArtist.email, this.seeArtist.contact_id)
            .then(this.fetchData());
        e.stopPropagation();
        this.setState({showConfirmAddUser: false});
    }

    /**
     * Called when the 'submit artist' button is pressed. Adds the artist from form to this event
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();
        artistService
            .addArtistToEvent(this.newArtist, this.documentId)
            .then(this.fetchData());
        this.newArtist = {
            artist_id: -1,
            artist_name: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: ""
        };
        this.documentId = -1;
    }

    render() {
        return (
            <div>
                <div>
                    <h3 className="m-2">Artistliste for {this.event.title}</h3>
                    <div className="row">
                        <div className="col">
                            <select size="10" className="form-control m-2" id="exampleFormControlSelect1">
                                {this.state.eventArtists.filter(artist => artist.artist_name.includes(this.artistFilter)).map(artist =>
                                    <option value={artist} key={artist.artist_id}
                                            onClick={() => this.onSelect(artist)}>{artist.artist_name}</option>
                                )}
                            </select>
                            <input className="form-control m-2" name="filter" placeholder="Filter" id="artistFilter"
                                   value={this.artistFilter}
                                   onChange={this.onChange}/>
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
                                    {this.seeArtist.artist_name !== "" ?
                                        <p className="card-text">
                                            <a href="#"><img src="./img/icons/download.svg"/> Last ned kontrakt</a>
                                        </p> : null}
                                    {this.seeArtist.artist_name !== "" ?
                                        <div className="align-bottom form-inline">
                                            {!this.seeArtist.user_id && !this.props.isArtist ?
                                                <button
                                                    id="showAddUser"
                                                    className="btn btn-primary m-1"
                                                    onClick={this.show}>
                                                    Opprett bruker
                                                </button> : null}
                                            {!this.props.isArtist ?
                                                <button
                                                    id="showWarning"
                                                    className="btn btn-danger m-1"
                                                    onClick={this.show}>
                                                    Fjern
                                                </button> : null}
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    {!this.props.isArtist ?
                        <div>
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
                                        <select id="documentSelect" className="custom-select m-2"
                                                value={this.documentId}
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
                                        <button className="btn btn-success m-2 float-right" type="submit">Legg til
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        : null}
                </div>
                <Modal
                    show={this.state.showRemoveWarning}
                    onHide={() => this.setState({showRemoveWarning: false})}
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
                        <Button.Light id="closeWarning"
                                      onClick={() => this.setState({showRemoveWarning: false})}>Lukk</Button.Light>
                        <Button.Red onClick={this.removeArtist}>Slett</Button.Red>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showConfirmAddUser}
                    onHide={() => this.setState({showConfirmAddUser: false})}
                    centered>
                    <Modal.Header>
                        <Modal.Title>Bekreft</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Bekreft opprettelse av bruker for {this.seeArtist.artist_name}.
                            E-post med innlogging blir sendt til {this.seeArtist.email}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Light
                            id="closeAddUser"
                            onClick={() => this.setState({showConfirmAddUser: false})}>Lukk</Button.Light>
                        <Button.Green onClick={this.addArtistUser}>Bekreft</Button.Green>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}