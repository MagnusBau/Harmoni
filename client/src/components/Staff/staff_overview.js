//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {roleService, Role, EventRole} from "../../services/roleService";
import {artistService} from "../../services/artistService";
import {userService} from "../../services/userService";
import {Modal} from "react-bootstrap";
import {Button} from "../Buttons/buttons";
import {Alert} from "../Alert/alert";

const history = createHashHistory();

export default class AddRole extends Component {
    currentEvent: number = 0;
    roles: Role[] = [];
    eventRoles: EventRole[] = [];
    newRole: Role = null;

    constructor(props, context) {
        super(props, context);
        this.newRole = {type: '', event: 0};
        this.state = {
            lmao: 1,
            showConfirmRemove: false,
            selected: null,
            showConfirmDelete: false
        }
    }

    mounted() {
        this.currentEvent = this.props.eventId;
        this.newRole.event = this.currentEvent;

        this.load();
    }

    load = direction => {
        if (direction) {
            this.setState({lmao: this.state.lmao + 1});
        }
        roleService
            .getAllRoles()
            .then(roles => this.roles = roles[0])
            .catch((error: Error) => console.log(error.message));
        roleService
            .getEventRoles(this.currentEvent)
            .then(eventRoles => this.eventRoles = eventRoles[0])
            .catch((error: Error) => console.log(error.message));
    };

    onChange(e) {
        this.newRole.type = e.target.value;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.newRole.type !== '') {
            console.log(this.newRole.type);
            roleService.createRole(this.newRole).then(response => {
                this.load();
            });

            this.newRole.type = '';

            //window.location.reload();
        }
    }

    remove() {
        roleService.removeRole(this.state.selected.role_id).then(response => {
            this.setState({selected: null, showConfirmDelete: false});
            if (response.error) {
                if (response.error.errno === 1451) {
                    Alert.danger("staffAlert", "Rollen kan ikke slettes for den tilhører et arrangement!");
                } else {
                    Alert.danger("staffAlert", `En feil har oppstått! (Feilkode: ${response.error.errno})`);
                }
            } else {
                this.load();
            }
        });

        //window.location.reload();
    }

    addToEvent(eventRole) {
        eventRole.event = this.currentEvent;
        eventRole.count = 1;
        roleService.assignRole(eventRole).then(response => {
            if (response.error) {
                // Duplicate entry key error from database
                if (response.error.errno === 1062) {
                    Alert.danger("roleAlert", "Personell er allerede tilknyttet dette arrangementet!");
                } else {
                    Alert.danger("roleAlert", `En feil har oppstått! (Feilkode: ${response.error.errno})`);
                }
            } else {
                this.load();
            }

        });
        //window.location.reload();
    }

    removeFromEvent() {
        let selected = {...this.state.selected};
        selected.event = this.currentEvent;
        console.log(`${this.state.selected.role_id} ${this.currentEvent}`);
        this.setState({selected});
        roleService.removeRoleFromEvent(this.state.selected.role_id, this.currentEvent).then(response => {
            this.setState({selected: null, showConfirmRemove: false});
            this.load();
        });

        //window.location.reload();
    }

    incrementRole(eventRole) {
        eventRole.event = this.currentEvent;
        eventRole.count++;
        roleService.updateRoleCount(eventRole).then(response => {
            this.load();
        });
    }

    decrementRole(eventRole) {
        if (eventRole.count > 1) {
            eventRole.event = this.currentEvent;
            eventRole.count--;
            roleService.updateRoleCount(eventRole).then(response => {
                this.load();
            });
        }
    }

    render() {
        return (
            <div className="m-2">
                <Alert name="roleAlert"/>
                {!this.props.isArtist ?
                    <form className={"form-inline"} onSubmit={this.onSubmit}>
                        <div className="form-group m-2">
                            <input type="text"
                                   className="form-control"
                                   id="role-type"
                                   defaultValue={this.newRole.type}
                                   placeholder="Rollenavn"
                                   onChange={this.onChange}
                                   required/>
                        </div>
                        <button type="submit" className="btn-primary m-2">Legg til</button>
                    </form>
                    : null}
                <table className="table w-50">
                    <thead>
                    <tr>
                        <th>Personell</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.roles.map((role =>
                            <tr key={role.role_id} className="d-flex">
                                <td className="col-7">{role.type}</td>
                                {!this.props.isArtist ?
                                    <div>
                                        <td>
                                            <button className="btn-primary" onClick={() => this.addToEvent(role)}>Legg
                                                til
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn-danger" onClick={() => this.setState({
                                                selected: role,
                                                showConfirmDelete: true
                                            })}>Fjern
                                            </button>
                                        </td>
                                    </div>
                                    : null}
                            </tr>
                    ))}
                    </tbody>
                </table>
                <table className="table w-50">
                    <thead>
                    <tr>
                        <th>Personell i arrangementet</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.eventRoles.map((eventRole =>
                            <tr key={eventRole.role_id} className="d-flex">
                                <td className="col-7">{eventRole.type}</td>
                                <td className="col-7">{eventRole.count}
                                    {!this.props.isArtist ?
                                        <div className="btn-group-vertical" role="group">
                                            <button type="button" className="btn-link"
                                                    onClick={() => this.incrementRole(eventRole)}>
                                                <img src="../img/icons/chevron-up.svg"/></button>
                                            <button type="button" className="btn-link"
                                                    onClick={() => this.decrementRole(eventRole)}>
                                                <img src="../img/icons/chevron-down.svg"/></button>
                                        </div>
                                        : null}
                                </td>
                                <td>
                                    {!this.props.isArtist ?
                                        <button type="button" className="btn-danger" onClick={() => {
                                            this.setState({selected: eventRole, showConfirmRemove: true})
                                        }}>Fjern
                                        </button>
                                    : null}
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </table>
                <Modal
                    show={this.state.showConfirmRemove}
                    onHide={() => this.setState({showConfirmRemove: false})}
                    centered>
                    <Modal.Header>
                        <Modal.Title>Advarsel</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Er du sikker på at du vil slette denne rollen fra dette arrangementet?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Light id="closeWarning"
                                      onClick={() => this.setState({showConfirmRemove: false})}>Lukk</Button.Light>
                        <Button.Red onClick={this.removeFromEvent}>Slett</Button.Red>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showConfirmDelete}
                    onHide={() => this.setState({showConfirmDelete: false})}
                    centered>
                    <Modal.Header>
                        <Modal.Title>Advarsel</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Er du sikker på at du vil slette denne rollen fra ditt register?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Light id="closeWarning"
                                      onClick={() => this.setState({showConfirmDelete: false})}>Lukk</Button.Light>
                        <Button.Red onClick={this.remove}>Slett</Button.Red>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
