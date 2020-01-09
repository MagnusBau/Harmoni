//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
const history = createHashHistory();
import { equipmentService, Equipment, EventEquipment} from "../services/equipmentService";

export class AddEquipment extends Component <{match: {params: {eventId: number}}}> {
    currentEvent: number = 0;
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
        equipmentService.addEquipmentToEvent(this.currentEvent, {item: this.newEquipment.item}, this.newEquipment.amount);
        this.newEquipment = {item: '',
                             amount: 1};
        window.location.reload();
    }

    mounted() {
        this.currentEvent = this.props.match.params.eventId;
        equipmentService
            .getEquipment()
            .then(equipment => this.equipment = equipment[0])
            .catch((error: Error) => console.log(error.message));

        equipmentService
            .getEquipmentByEvent(this.currentEvent)
            .then(eventEquipment => this.eventEquipment = eventEquipment[0])
            .catch((error: Error) => console.log(error.message));
        console.log(this.equipment.map((equipment) => equipment.item));
    }

    deleteEquipment(eventEquipment) {
        console.log(eventEquipment.event + " " + eventEquipment.equipment);
        equipmentService.removeEquipmentFromEvent(eventEquipment);
        eventEquipment = null;
        window.location.reload();
    }

    incrementAmount(equipment: EventEquipment) {
        equipment.amount++;
        equipmentService.updateEquipmentOnEvent(equipment);
        window.location.reload();
    }

    decrementAmount(equipment: EventEquipment) {
        if (equipment.amount > 1) {
            equipment.amount--;
            equipmentService.updateEquipmentOnEvent(equipment);
            window.location.reload();
        }
    }

    render() {
        return(
            <div className="m-2">
                <form className="form-inline" onSubmit={this.onSubmit}>
                    <div className="form-group m-2">
                        <select className="custom-select" name="item" onChange={this.onChange} required>
                            <option selected value="">Velg...</option>
                            {this.equipment.map(equipment =>
                                <option value={equipment.item}>{equipment.item}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group m-2">
                        <input width="32px" type="number" name="amount" min="1" className="form-control" id="equipmentType"
                               placeholder="Ant." value={this.newEquipment.amount} onChange={this.onChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary m-2">Legg til</button>
                </form>
                <table className="table w-50">
                    <thead>
                        <tr className="d-flex">
                            <th className="col-7">Utstyr</th>
                            <th className="col-3">Antall</th>
                            <th className="col-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.eventEquipment.map((eventEquipment =>
                                <tr className="d-flex">
                                    <td className="col-7">{eventEquipment.item}</td>
                                    <td className="col-3">{eventEquipment.amount}
                                        <div className="btn-group-vertical ml-4" role="group">
                                            <button type="button" className="btn btn-link" onClick={() => this.incrementAmount(eventEquipment)}><img src="./img/icons/chevron-up.svg"/></button>
                                            <button type="button" className="btn btn-link" onClick={() => this.decrementAmount(eventEquipment)}><img src="./img/icons/chevron-down.svg"/></button>
                                        </div>
                                    </td>
                                    <td className="col-2"><button type="button" className="btn btn-danger" onClick={() => this.deleteEquipment(eventEquipment)}>Fjern</button></td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}