//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import Autosuggest from 'react-autosuggest';
import {equipmentService, Equipment, EventEquipment} from "../services/equipmentService";

const history = createHashHistory();


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.item;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.item}
    </div>
);

export class AddEquipment extends Component <{ match: { params: { eventId: number } } }> {
    // TODO: Verify that event exists before loading page
    currentEvent: number = 0;
    equipment: Equipment[] = [];
    eventEquipment: EventEquipment[] = [];
    newEquipment: EventEquipment = null;

    constructor(props, context) {
        super(props, context);

        this.newEquipment = {
            item: '',
            amount: 1
        };
        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange(e) {
        const name = e.target.name;
        this.newEquipment[name] = e.target.value;
    }

    onSubmit(e) {
        e.preventDefault();
        equipmentService.addEquipmentToEvent(this.currentEvent, {item: this.newEquipment.item}, this.newEquipment.amount);
        this.newEquipment = {
            item: '',
            amount: 1
        };
        this.mounted();
    }

    mounted() {
        this.currentEvent = this.props.eventId;
        this.equipment = [];
        this.eventEquipment = [];
        equipmentService
            .getEquipment()
            .then(equipment => this.equipment = equipment[0])
            .catch((error: Error) => console.log(error.message));

        equipmentService
            .getEquipmentByEvent(this.currentEvent)
            .then(eventEquipment => this.eventEquipment = eventEquipment[0])
            .catch((error: Error) => console.log(error.message));
    }

    deleteEquipment(eventEquipment) {
        equipmentService.removeEquipmentFromEvent(eventEquipment);
        this.mounted();
    }

    incrementAmount(equipment: EventEquipment) {
        equipment.amount++;
        equipmentService.updateEquipmentOnEvent(equipment);
        this.mounted();
    }

    decrementAmount(equipment: EventEquipment) {
        if (equipment.amount > 1) {
            equipment.amount--;
            equipmentService.updateEquipmentOnEvent(equipment);
            this.mounted();
        }
    }

    onDropdownChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });
        this.newEquipment.item = newValue;
    };

    // Filter method for getting suggestions
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.equipment.filter(equipment =>
            equipment.item.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            case 13: {
                event.preventDefault();
            }
        }
    };

    render() {
        const {value, suggestions} = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Fyll inn utstyr...',
            value: this.newEquipment.item,
            onChange: this.onDropdownChange,
            className: "form-control",
            required: true,
            onKeyDown: this.onKeyDown
        };
        return (
            <div className="w-75 m-2">
                <h2>{`Utstyrsliste for arrangement ${this.currentEvent}`}</h2>
                <form className="form-inline" onSubmit={this.onSubmit}>
                    <div className="form-group m-2">
                        <Autosuggest suggestions={suggestions}
                                     onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                     onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                     getSuggestionValue={getSuggestionValue}
                                     renderSuggestion={renderSuggestion}
                                     inputProps={inputProps}/>
                    </div>
                    <div className="form-group m-2">
                        <input width="32px" type="number" name="amount" min="1" className="form-control"
                               id="equipmentType"
                               placeholder="Ant." value={this.newEquipment.amount} onChange={this.onChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary m-2 col-1">Legg til</button>
                </form>
                <table className="table">
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
                                        <button type="button" className="btn btn-link"
                                                onClick={() => this.incrementAmount(eventEquipment)}><img
                                            src="./img/icons/chevron-up.svg"/></button>
                                        <button type="button" className="btn btn-link"
                                                onClick={() => this.decrementAmount(eventEquipment)}><img
                                            src="./img/icons/chevron-down.svg"/></button>
                                    </div>
                                </td>
                                <td className="col-2">
                                    <button type="button" className="btn btn-danger"
                                            onClick={() => this.deleteEquipment(eventEquipment)}>Fjern
                                    </button>
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
