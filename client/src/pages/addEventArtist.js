//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import Autosuggest from 'react-autosuggest';
import {artistService, Artist} from "../services/artistService";
import {Event, eventService} from "../services/eventService";

const history = createHashHistory();

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.artist_name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.artist_name}
    </div>
);

export class AddEventArtist extends Component <{ match: { params: { eventId: number } } }> {
    // TODO: Verify that event exists before loading page
    event: Event = null;
    eventArtists: Artist[] = [];
    newArtist: Artist = null;

    constructor(props, context) {
        super(props, context);

        this.newArtist = {artist_id: -1,
                          artist_name: "",
                          first_name: "",
                          last_name: "",
                          email: "",
                          phone: ""};

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
        window.location.reload();
    }

    mounted() {
        eventService
            .getEventID(this.props.match.params.eventId)
            .then(event => this.event = event)
            .catch((error: Error) => console.log(error.message));

        artistService
            .getArtistByEvent(this.event.event_id)
            .then(artists => this.eventArtists = artists)
            .catch((error: Error) => console.log(error.message));
    }

    deleteEquipment(eventEquipment) {
        equipmentService.removeEquipmentFromEvent(eventEquipment);
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
            value: this.newArtist.artist_name,
            onChange: this.onDropdownChange,
            className: "form-control",
            required: "true",
            onKeyDown: this.onKeyDown
        };
        return (
            <div className="w-50 m-2">
                <h2>{`Artistliste for #${this.event.event_id} (${this.event.title})`}</h2>
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
                        <th className="col-2">Artistnavn</th>
                        <th className="col-2">Fullt Navn</th>
                        <th className="col-2">Epost</th>
                        <th className="col-2">Telefonnr.</th>
                        <th className="col-2">Kontrakt</th>
                        <th className="col-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.eventArtists.map((eventArtist =>
                            <tr className="d-flex">
                                <td className="col-2">{eventArtist.artist_name}</td>
                                <td className="col-2">{`${eventArtist.first_name} ${eventArtist.last_name}`}</td>
                                <td className="col-2">{eventArtist.email}</td>
                                <td className="col-2">{eventArtist.phone}</td>
                                <td className="col-2"></td>
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