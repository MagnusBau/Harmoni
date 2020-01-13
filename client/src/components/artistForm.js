// @flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {Artist, artistService} from "../services/artistService";

export class ArtistForm extends Component {
    artist: Artist = null;
    selectArtists: Artist[] = [];
    artistFilter: string = "";
    chooseArtist: boolean = true;

    constructor(props) {
        super(props);

        this.artist = {artist_id: -1,
                       artist_name: "",
                       first_name: "",
                       last_name: "",
                       email: "",
                       phone: ""};
    }

    mounted() {
        artistService
            .getAllArtists()
            .then(artists => this.selectArtists = artists[0])
            .catch((error: Error) => console.log(error.message));
    }

    onChange(e) {
        const name = e.target.name;
        this.artist[name] = e.target.value;
    }

    onSelect(e) {
        console.log(e.target.value);
        this.artist = this.selectArtists[e.target.value-1];
    }

    onChangeFilter(e) {
        this.artistFilter = e.target.value;
    }

    onCheckedChange(e) {
        this.chooseArtist = e.target.value === "true";
    }

    render() {
        let artistOverview = null;
        if (this.artist) {
            artistOverview = (<h2>Her kommer artisten</h2>);
        } else {
            artistOverview = (<h2>Legg til en artist, ditt naut!</h2>);
        }

        return (
            <form className="w-50 form m-2">
                <div className="row">
                    <div className="form-group col" aria-disabled={!this.chooseArtist}>
                        <select size="10" className="form-control m-2" disabled={!this.chooseArtist} id="exampleFormControlSelect1">
                            {this.selectArtists.filter(artist => artist.artist_name.includes(this.artistFilter)).map(artist =>
                                <option value={artist.artist_id} key={artist.artist_id} onClick={this.onSelect}>{artist.artist_name}</option>
                            )}
                        </select>
                        <input className="form-control m-2" name="filter" placeholder="Filter" disabled={!this.chooseArtist} value={this.artistFilter} onChange={this.onChangeFilter}/>
                    </div>
                    <div className="card col m-2">
                        <div className="card-header">
                            Knytt opp artist
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{this.artist.artist_name}</h5>
                            <p className="card-text"><b>Fullt navn: </b>{this.artist.first_name + " " + this.artist.last_name}</p>
                            <p className="card-text"><b>Epost: </b>{this.artist.email}</p>
                            <p className="card-text"><b>Telefonnr.: </b>{this.artist.phone}</p>
                            <a href="#" className="btn btn-primary align-bottom">Legg til</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group col" id="newArtist">
                            <input className="form-control m-2" name="artist_name" placeholder="Artistnavn" disabled={this.chooseArtist} value={this.artist.artist_name} onChange={this.onChange}/>
                            <input className="form-control m-2" name="first_name" placeholder="Fornavn" disabled={this.chooseArtist} value={this.artist.first_name} onChange={this.onChange}/>
                            <input className="form-control m-2" name="last_name" placeholder="Etternavn" disabled={this.chooseArtist} value={this.artist.last_name} onChange={this.onChange}/>
                            <input className="form-control m-2" name="email" placeholder="E-post" disabled={this.chooseArtist} value={this.artist.email} onChange={this.onChange}/>
                            <input className="form-control m-2" name="phone" placeholder="Telefonnr." disabled={this.chooseArtist} value={this.artist.phone} onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="col"/>
                </div>
            </form>
        );
    }
}