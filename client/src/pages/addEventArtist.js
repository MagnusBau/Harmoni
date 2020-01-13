// @flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {eventService, Event} from "../services/eventService";
import {ArtistForm} from "../components/artistForm";

export class AddEventArtist extends Component <{ match: { params: { eventId: number } } }> {
    event: Event = null;
    artist = null;
    contract = null;

    mounted() {
        eventService
            .getEventID(this.props.match.params.eventId)
            .then(event => this.event = event[0][0])
            .catch((error: Error) => console.log(error.message));
    }

    render() {
        let artistOverview = null;
        if (this.artist) {
            artistOverview = (<h2>Her kommer artisten</h2>);
        } else {
            artistOverview = (
                <div>
                    <h2>Legg til en artist, ditt naut!</h2>
                    <ArtistForm/>
                </div>

            );
        }

        return artistOverview;
    }
}