// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {roleService, Role} from "../services/roleService";

const history = createHashHistory();

export class AddRole extends Component <{match: {params: {id: number}}}> {
    event: number = 1;
    roles: Role[] = [];
    newRole: Role = null;
    mounted() {
        roleService
            .getAllRoles()
            .then(roles => this.roles = roles)
            .catch((error: Error) => console.log(error.message));
    }
    onChange(e) {

    }
    onSubmit(e) {
        e.preventDefault();
        roleService.createRole(this.newRole.type, this.event);
        this.newRole = null;
        window.location.reload();
    }
    render() {
        return(
            <div className="m-2">
                <form className={"form-inline"} onSubmit={this.onSubmit}>
                    <div className="form-group m-2">
                        <input type="text" className="form-control" placeholder="Rollenavn"/>
                    </div>
                    <button type="submit" className="btn-primary m-2">Legg til</button>
                </form>
                <table className="table w-50">
                    <thead>
                    <tr>
                        <th>Personell</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.roles.map((role =>
                            <tr>
                                <td>{role.type}</td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}