// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import {Event, eventService, FrontpageEvent} from "../services/eventService";
import {createHashHistory} from "history";
import "../../public/css/home.css";

/**
 * Class for the view of Home-page
 *
 * @author Victoria Blichfeldt
 */

const history = createHashHistory();

class Home extends Component {
    events: FrontpageEvent[] = [];

    viewEvent(e) {
        history.push("/event/" + e + "/view")
    };

    render(){
        return (
            <div>
                <div className="image-header" id="wrap">
                    <img id="test" src="./img/several-people-at-a-party-1540338.jpg" alt="" width="100%" height="auto"/>
                </div>

                <div className="container mt-4" id="frontpage">
                    <div className="card" id="frontpage-card-container">
                        <div className="card-header">KOMMENDE ARRANGEMENTER</div>
                        <div className="card-body" id="frontpage-card-container">
                        <div className="card-columns">
                            {this.events.map(event => (
                                <div className="card" id="frontpageCard">
                                    <img className="card-img-top img-fluid" src="./img/happy-faces-2231989.jpg" alt="happy faces"/>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {event.title}
                                        </h5>
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            {event.time}
                                        </h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    mounted(){
        eventService.getAllEvents()
            .then(events => (this.events = events))
            .catch((error: Error) => console.log(error.message));
    }
}

export default Home;

/*
 <div id="carouselWithControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="card text-center">
                                    <h5 className="card-title">
                                        test slide
                                    </h5>
                                    <p className="card-subtitle">
                                        ( for at karousellen skal snurre :( )
                                    </p>
                                </div>
                            </div>
                            {this.events.map(events => (
                                <div className="carousel-item">
                                    <div className="card text-center">
                                        <h5 className="card-title">
                                            {events.title}
                                        </h5>
                                        <p className="card-subtitle">
                                            {events.start_time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a className="carousel-control-prev" href="#carouselWithControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"/>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselWithControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"/>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>


*/
