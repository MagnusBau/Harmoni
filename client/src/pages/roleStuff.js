// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {roleService, Role} from "../services/roleService";

const history = createHashHistory();

export class AddRole extends Component <{match: {params: {id: number}}}> {
    roles: Role[] = [];

    mounted() {

    }
}