//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
const history = createHashHistory();
import { equipmentService, Equipment, EventEquipment} from "../services/equipmentService";


export class AddEquipment extends Component <{match: {params: {id: number}}}> {
    currentEvent: number = 1;
    equipment: Equipment[] = [];
    eventEquipment: EventEquipment[] = [];
    newEquipment: EventEquipment = null;

    constructor(props, context) {
        super(props, context);

        this.newEquipment = {item: '',
                             amount: 1}
    }

    onChange(e) {
        const name = e.target.name;
        this.newEquipment[name] = e.target.value;
    }

    onSubmit(e) {
        e.preventDefault();
        equipmentService.addEquipmentToEvent(this.currentEvent, this.newEquipment);
        this.newEquipment = {item: '',
                             amount: 1};
        history.replace('/');
    }

    mounted() {
        equipmentService
            .getEquipment()
            .then(equipment => this.equipment = equipment)
            .catch((error: Error) => console.log(error.message));

        equipmentService
            .getEquipmentByEvent(this.currentEvent)
            .then(eventEquipment => this.eventEquipment = eventEquipment[0])
            .catch((error: Error) => console.log(error.message));
    }

    render() {
        return(
            <div className="m-2">
                <form className="form-inline" onSubmit={this.onSubmit}>
                    <div className="form-group m-2">
                        <input type="text" name="item" className="form-control" id="equipmentType" aria-describedby="emailHelp"
                               placeholder="Utstyr" value={this.newEquipment.item} onChange={this.onChange}/>
                    </div>
                    <div className="form-group m-2">
                        <input type="number" name="amount" aria-valuemin="0" className="form-control" id="equipmentType"
                               placeholder="Ant." value={this.newEquipment.amount} onChange={this.onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary m-2">Legg til</button>
                </form>
                <ul className="list-group w-50">
                    {this.eventEquipment.map((eventEquipment =>
                            <li className="list-group-item">{eventEquipment.item}
                                <span className="badge badge-primary badge-pill float-right">{eventEquipment.amount}</span>
                            </li>
                    ))}
                </ul>
            </div>
        )
    }
}