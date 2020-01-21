//@flow

import * as React from 'react';
import {Component} from "react-simplified";

import {equipmentService, Equipment, EventEquipment} from "../../services/equipmentService";
import Autosuggest from 'react-autosuggest';
import {userService} from "../../services/userService";
import {artistService} from "../../services/artistService";

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

// TODO: Clean up this mess

export default class AddEquipment extends Component {
    //TODO: send error message when event is deleted
    newEquipment: EventEquipment = null;

    constructor(props, context) {
        super(props, context);

        this.newEquipment = {
            item: '',
            amount: 1
        };

        this.state = {
            value: '',
            suggestions: [],
            eventEquipment: [],
            userEquipment: []
        };
    }

    mounted() {
        this.fetchData();
    }

    /**
     * Called whenever an input in the form changes
     * @param e
     */
    onChange(e) {
        const name = e.target.name;

        this.newEquipment[name] = e.target.value;
    }

    /**
     * Called when 'add equipment' button is pressed. Creates an equipment and binds it to the event
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();
        equipmentService.addEquipmentToEvent(this.props.eventId, {item: this.newEquipment.item}, this.newEquipment.amount).then(response => {
            this.fetchData();
        });
        this.newEquipment = {
            item: '',
            amount: 1
        };
    }

    /**
     * Fetches data from the database
     */
    fetchData() {
        this.setState({userEquipment: [], eventEquipment: []});

        equipmentService
            .getEquipment()
            .then(equipment => this.setState({userEquipment: equipment[0]}))
            .catch((error: Error) => console.log(error.message));

        equipmentService
            .getEquipmentByEvent(this.props.eventId)
            .then(equipment => {this.setState({
                eventEquipment: equipment[0]
            })})
            .catch((error: Error) => console.log(error.message));
    }

    /**
     * Deletes the selected equipment from the event
     * @param eventEquipment
     */
    deleteEquipment(eventEquipment) {
        equipmentService.removeEquipmentFromEvent(eventEquipment).then(response => {
            this.fetchData();
        });
    }

    /**
     * Increments the amount of an equipment
     * @param equipment
     */
    incrementAmount(equipment: EventEquipment) {
        equipment.amount++;
        equipmentService.updateEquipmentOnEvent(equipment).then(response => {
            this.fetchData();
        });
    }

    /**
     * Decrements the amount of an equipment
     * @param equipment
     */
    decrementAmount(equipment: EventEquipment) {
        if (equipment.amount > 1) {
            equipment.amount--;
            equipmentService.updateEquipmentOnEvent(equipment).then(response => {
                this.fetchData();
            });
        }
    }

    /**
     * Called whenever the equipment dropdown is changed
     * @param event
     * @param newValue
     */
    onDropdownChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });

        this.newEquipment.item = newValue;
    };

    /**
     * Filter method for getting suggestions
     * @param value
     * @returns {*}
     */
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.userEquipment.filter(equipment =>
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
            required: "true",
            onKeyDown: this.onKeyDown
        };

        return (
            <div className="w-75 m-2">
                <h3>{`Utstyrsliste for ${this.props.eventId}`}</h3>
                {!this.props.isArtist ?
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
                        <button type="submit" className="btn btn-primary m-2">Legg til</button>
                    </form>
                : null}
                <table className="table">
                    <thead>
                    <tr className="d-flex">
                        <th className="col-7">Utstyr</th>
                        <th className="col-3">Antall</th>
                        <th className="col-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.eventEquipment.map(eventEquipment => (
                        <tr className="d-flex">
                            <td className="col-7">{eventEquipment.item}</td>
                            <td className="col-3">{eventEquipment.amount}
                                {!this.props.isArtist ?
                                    <div className="btn-group-vertical ml-4" role="group">
                                        <button type="button" className="btn btn-link"
                                                onClick={() => this.incrementAmount(eventEquipment)}><img
                                            src="./img/icons/chevron-up.svg"/></button>
                                        <button type="button" className="btn btn-link"
                                                onClick={() => this.decrementAmount(eventEquipment)}><img
                                            src="./img/icons/chevron-down.svg"/></button>
                                    </div>
                                : null}
                            </td>
                            <td className="col-2">
                                {!this.props.isArtist ?
                                    <button type="button" className="btn btn-danger"
                                            onClick={() => this.deleteEquipment(eventEquipment)}>Fjern
                                    </button>
                                : null}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
