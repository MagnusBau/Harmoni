// @flow
import * as React from 'react';
import {Component} from "react-simplified";
import {Event, eventService} from "../services/eventService";
import { createHashHistory } from 'history';
import {userService} from "../services/userService";

const history = createHashHistory();
import {Ticket, ticketService} from "../services/ticketService";
import {EventEquipment, equipmentService} from "../services/equipmentService";
import AddEquipment from "../components/Equipment/add_equipment";
import TicketView from "../components/Ticket/ticket_types";
import EventView from "../components/Event/event_view";
import {EventEdit} from "../components/Event/event_edit";
/**
 * Class for the view of one event
 *
 * @author Victoria Blichfeldt
 */
//TODO fikse bug med at arrangement overview ikke alltid oppdateres etter at redigering er utført
//TODO flette utstyr og dokumenter når det er ferdig
export default class UserEdit extends Component {
    firstName: string = userService.getFirstName();
    lastName: string = userService.getLastName();
    email: string = userService.getEmail();
    phone: string = userService.getPhone();
    oldPassword: string = "";
    newPassword: string = "";
    confirmNewPassword: string = "";
    artistName: string = "";
    userForm: any = null;
    passwordForm: any = null;
    artistForm: any = null;
    errorMessage: string = "";

    constructor(props){
        super(props);
        this.state = {isEditingEvent: false}
    }

    mounted() {
//TODO get events by user
        userService.getUser().then(respons => {
            if(userService.getArtistId() != null) {
                this.artistName = userService.getArtistName();
            }
            this.firstName = userService.getFirstName();
            this.lastName  = userService.getLastName();
            this.email = userService.getEmail();
            this.phone = userService.getPhone();
        });
    }


    render(){
        let artistBox;
        if(userService.getArtistName() != null) {
            artistBox = (
                <div className="list-group" className="">
                    <form ref={e => (this.artistForm = e)}>
                        <li className="list-group-item">
                            <h5>Artist Navn:</h5>
                            <input
                                type="text"
                                className="form-control"
                                value={this.artistName}
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.artistName = event.target.value)}
                                required
                                maxLength={50}
                            />
                        </li>
                        <li className="list-group-item list-group-item-action list-group-item-primary" onClick={(e) => {
                            this.saveArtistChanges();
                        }}>
                            Lagre Endringer
                        </li>
                    </form>
                </div>
            );
        } else {
            artistBox = (
                <div className="list-group">
                    <form ref={e => (this.artistForm = e)}>
                        <li className="list-group-item">
                            <h5>Artist Navn:</h5>
                            <input
                                type="text"
                                className="form-control"
                                value={this.artistName}
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.artistName= event.target.value)}
                                required
                                maxLength={50}
                            />
                        </li>
                        <li className="list-group-item list-group-item-action list-group-item-primary" onClick={(e) => {
                            this.registerArtist();
                        }}>
                            Registrer deg som artist
                        </li>
                    </form>
                </div>
            );
        }

        return (
            //TODO en eller annen header for hvilken user som er logget inn
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Profil</h5>
                                <div className="list-group" className="">
                                    <form ref={e => (this.userForm = e)}>
                                        <li className="list-group-item">
                                            <h5>Username:</h5>
                                            {userService.getUsername()}
                                        </li>
                                        <li className="list-group-item">
                                            <h5>Name:</h5>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={this.firstName}
                                                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.firstName = event.target.value)}
                                                        required
                                                        maxLength={50}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={this.lastName}
                                                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.lastName  = event.target.value)}
                                                        required
                                                        maxLength={50}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <h5>Email:</h5>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.email}
                                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.email= event.target.value)}
                                                required
                                                maxLength={50}
                                            />
                                        </li>
                                        <li className="list-group-item">
                                            <h5>Phone:</h5>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.phone}
                                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.phone= event.target.value)}
                                                required
                                                maxLength={50}
                                            />
                                        </li>
                                        <li className="list-group-item list-group-item-action list-group-item-primary" onClick={(e) => {
                                            this.saveChanges();
                                        }}>
                                            Lagre Endringer
                                        </li>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Password</h5>
                                <div className="list-group">
                                    <form ref={e => (this.passwordForm = e)}>
                                        <li className="list-group-item">
                                            <h5>Gammelt Passord:</h5>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={this.oldPassword}
                                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.oldPassword = event.target.value)}
                                                required
                                                maxLength={256}
                                            />
                                        </li>
                                        <li className="list-group-item">
                                            <h5>Nytt Passord:</h5>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={this.newPassword}
                                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.newPassword = event.target.value)}
                                                required
                                                maxLength={256}
                                            />
                                        </li>
                                        <li className="list-group-item">
                                            <h5>Gjenta Nytt Passord:</h5>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={this.confirmNewPassword}
                                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.confirmNewPassword= event.target.value)}
                                                required
                                                maxLength={256}
                                            />
                                        </li>
                                    </form>
                                    <li className="list-group-item list-group-item-action list-group-item-primary" onClick={(e) => {
                                        this.changePassword();
                                    }}>
                                        Oppdater Passord
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Profilbilde</h5>
                                <div className="list-group" className="">
                                    <form ref={e => (this.artistForm = e)}>
                                        <li className="list-group-item">
                                            <h5>Bilde</h5>

                                        </li>
                                        <li className="list-group-item list-group-item-action list-group-item-primary" onClick={(e) => {
                                            this.saveImageChanges();
                                        }}>
                                            Lagre Endringer
                                        </li>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Artist</h5>
                                {artistBox}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">

                    </div>
                </div>
            </div>
        )
    }

    saveChanges() {
        console.log("yo");
        if(!this.userForm || !this.userForm.checkValidity()) {
            return;
        }
        console.log("try");
        userService.updateUser(this.email, this.firstName, this.lastName, this.phone).then(response => {
            if(response.error) {
                this.errorMessage = "Something went wrong";
                return;
            } else {
                this.mounted()
                return;
            }
        })
    }

    changePassword() {

    }

    registerArtist() {

    }

    saveArtistChanges() {

    }

    saveImageChanges() {

    }
}
