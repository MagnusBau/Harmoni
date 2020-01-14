// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {roleService, Role, EventRole} from "../services/roleService";

const history = createHashHistory();

export class AddRole extends Component <{match: {params: {eventId: number}}}> {
    currentEvent: number = 1;
    roles: Role[] = [];
    eventRoles: EventRole[] = [];
    newRole: Role = null;

    constructor(props, context) {
        super(props, context);
        this.newRole = {type: '', event: 0};
    }
    mounted() {
        this.currentEvent = this.props.match.params.eventId;
        this.newRole.event = this.currentEvent;
        roleService
            .getAllRoles()
            .then(roles => this.roles = roles[0])
            .catch((error: Error) => console.log(error.message));
        roleService
            .getEventRoles(this.currentEvent)
            .then(eventRoles => this.eventRoles = eventRoles[0])
            .catch((error: Error) => console.log(error.message));
        console.log(this.eventRoles);
    }
    onChange(e) {
        const type = e.target.type;
        this.newRole[type] = e.target.value;
    }
    onSubmit(e) {
        e.preventDefault();
        roleService.createRole(this.newRole);
        this.newRole.type = '';
    }
    remove(role) {
        roleService.removeRole(role.role_id);
    }
    addToEvent(eventRole) {
        eventRole.count = 1;
        roleService.assignRole(eventRole);
    }
    removeFromEvent(eventRole) {
        roleService.removeRoleFromEvent(eventRole);
    }
    incrementRole(eventRole) {
        eventRole.count++;
        roleService.updateRoleCount(eventRole);
    }
    decrementRole(eventRole) {
        if(eventRole.count > 1) {
            eventRole.count--;
            roleService.updateRoleCount(eventRole);
        }
    }
    render(){
        return(
            <div className="m-2">
                <form className={"form-inline"} onSubmit={this.onSubmit}>
                    <div className="form-group m-2">
                        <input type="text"
                               className="form-control"
                               id="role-type"
                               placeholder="Rollenavn"
                               onChange={this.onChange}/>
                    </div>
                    <button type="submit" className="btn-primary m-2">Legg til</button>
                </form>
                <table className="table w-50">
                    <thead><tr><th>Personell</th></tr></thead>
                    <tbody>
                        {this.roles.map((role =>
                            <tr key={role.role_id} className="d-flex">
                                <td className="col-7">{role.type}</td>
                                <td><button className="btn-primary" onClick={() => this.addToEvent(role)}>Legg til</button></td>
                                <td><button className="btn-danger" onClick={() => this.remove(role)}>Fjern</button></td>
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
                                    <div className="btn-group-vertical" role="group">
                                        <button type="button" className="btn-link" onClick={() => this.incrementRole(eventRole)}>INC</button>
                                        <button type="button" className="btn-link" onClick={() => this.decrementRole(eventRole)}>DEC</button>
                                    </div>
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
