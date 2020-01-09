// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {roleService, Role} from "../services/roleService";

const history = createHashHistory();

export class AddRole extends Component <{match: {params: {id: number}}}> {
    roles: Role[] = [];
    newRole: Role;
    mounted() {
        roleService
            .getAllRoles()
            .then(roles => this.roles = roles)
            .catch((error: Error) => console.log(error.message));
    }
    onSubmit(e) {

    }
    render() {
        return(
            <div className="m-2">
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
                                <td><button type="button" className="btn btn-danger">Fjern</button></td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}