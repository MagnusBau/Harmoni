// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {roleService, Role} from "../services/roleService";

const history = createHashHistory();

export class AddRole extends Component <{match: {params: {eventId: number}}}> {
    event: number = 0;
    roles: Role[] = [];
    newRole: Role = null;

    constructor(props, context) {
        super(props, context);
    }
    mounted() {
        this.event = this.props.match.params.eventId;
        roleService
            .getAllRoles()
            .then(roles => this.roles = roles)
            .catch((error: Error) => console.log(error.message));
    }
    onChange(e) {
        const type = e.target.name;
        this.newRole[type] = e.target.name;

    }
    onSubmit(e) {
        e.preventDefault();
        roleService.createRole({type: this.newRole.type, event: this.event});
        this.newRole = null;
        window.location.reload();
    }
    remove(role){
        roleService.removeRole({roleId: role.role_id});
        window.location.reload();
    }
    render() {
        console.log(this.roles)
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
                            <tr className="d-flex">
                                <td className="col-7">{role.type}
                                    <button className="btn-danger" onClick={this.remove}>Fjern</button>
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}