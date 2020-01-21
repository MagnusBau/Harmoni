//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {roleService, Role, EventRole} from "../../services/roleService";
import {artistService} from "../../services/artistService";
import {userService} from "../../services/userService";

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
            lmao: 1
        }
    }
    mounted() {
        this.currentEvent = this.props.eventId;
        this.newRole.event = this.currentEvent;

        this.load();
    }
    load = direction => {
        if (direction) {
            this.setState({lmao: this.state.lmao +1});
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
            roleService.createRole(this.newRole);
            this.newRole.type = '';
            this.load();
            //window.location.reload();
        }
    }
    remove(role) {
        roleService.removeRole(role.role_id);
        this.load();
        //window.location.reload();
    }
    addToEvent(eventRole) {
        eventRole.event = this.currentEvent;
        eventRole.count = 1;
        roleService.assignRole(eventRole).then(response => {
            this.load();
        });
        //window.location.reload();
    }
    removeFromEvent(eventRole) {
        eventRole.event = this.currentEvent;
        roleService.removeRoleFromEvent(eventRole);
        this.load();
        //window.location.reload();
    }
    incrementRole(eventRole) {
        eventRole.event = this.currentEvent;
        eventRole.count++;
        roleService.updateRoleCount(eventRole);
    }
    decrementRole(eventRole) {
        if(eventRole.count > 1) {
            eventRole.event = this.currentEvent;
            eventRole.count--;
            roleService.updateRoleCount(eventRole);
        }
    }
    render(){
        return(
            <div className="m-2">
                {!this.props.isArtist ?
                    <form className={"form-inline"} onSubmit={this.onSubmit}>
                        <div className="form-group m-2">
                            <input type="text"
                                   className="form-control"
                                   id="role-type"
                                   defaultValue={this.newRole.type}
                                   placeholder="Rollenavn"
                                   onChange={this.onChange}/>
                        </div>
                        <button type="submit" className="btn-primary m-2">Legg til</button>
                    </form>
                : null}
                <table className="table w-50">
                    <thead><tr><th>Personell</th></tr></thead>
                    <tbody>
                    {this.roles.map((role =>
                            <tr key={role.role_id} className="d-flex">
                                <td className="col-7">{role.type}</td>
                                {!this.props.isArtist ?
                                    <div>
                                        <td><button className="btn-primary" onClick={() => this.addToEvent(role)}>Legg til</button></td>
                                        <td><button className="btn-danger" onClick={() => this.remove(role)}>Fjern</button></td>
                                    </div>
                                : null}
                            </tr>
                    ))}
                    </tbody>
                </table>
                <table className="table w-50">
                    <thead><tr><th>Personell i arrangementet</th></tr></thead>
                    <tbody>
                    {this.eventRoles.map((eventRole =>
                            <tr key={eventRole.role_id} className="d-flex">
                                <td className="col-7">{eventRole.type}</td>
                                <td className="col-7">{eventRole.count}
                                    {!this.props.isArtist ?
                                        <div className="btn-group-vertical" role="group">
                                            <button type="button" className="btn-link" onClick={() => this.incrementRole(eventRole)}>
                                                <img src="../img/icons/chevron-up.svg"/></button>
                                            <button type="button" className="btn-link" onClick={() => this.decrementRole(eventRole)}>
                                                <img src="../img/icons/chevron-down.svg"/></button>
                                        </div>
                                    : null}
                                </td>
                                <td><button type="button" className="btn-danger" onClick={() => this.removeFromEvent(eventRole)}>Fjern</button></td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
