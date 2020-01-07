//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
import { equipmentService, Equipment, EventEquipment} from "../services/equipmentService";

const history = createHashHistory();

export class AddEquipment extends Component <{match: {params: {id: number}}}> {
    equipment: Equipment[] = [];
    eventEquipment: EventEquipment[] = [];

    constructor(props, context) {
        super(props, context);
    }

    mounted() {
        equipmentService
            .getEquipment()
            .then(equipment => this.equipment = equipment)
            .catch((error: Error) => console.log(error.message));

        equipmentService
            .getEquipmentByEvent(1)
            .then(eventEquipment => this.eventEquipment = eventEquipment)
            .catch((error: Error) => console.log(error.message));
        console.log(this.equipment);
    }

    render() {
        return(
            <div className="m-2">
                <form className="form-inline">
                    <div className="form-group m-2">
                        <input type="text" className="form-control" id="equipmentType" aria-describedby="emailHelp"
                               placeholder="Utstyr"/>
                    </div>
                    <div className="form-group m-2">
                        <input type="number" aria-valuemin="0" className="form-control" id="equipmentType"
                               placeholder="Ant."/>
                    </div>
                    <button type="submit" className="btn btn-primary m-2">Legg til</button>
                </form>
                <ul className="list-group w-50">
                    {this.equipment.map((equipment =>
                            <li className="list-group-item">{equipment.name}
                                <span className="badge badge-primary badge-pill float-right">14</span>
                            </li>
                    ))}
                </ul>
            </div>
        )
    }
}