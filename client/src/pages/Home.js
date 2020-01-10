// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import {Event, eventService} from "../services/eventService";

/**
 * Class for the view of Home-page
 *
 * @author Victoria Blichfeldt
 */
class Home extends Component {
    events: Event[] = [];

    render(){
        return (
            <div>
                <div>
                    <div id="carouselWithControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            {this.events.map(events => (
                                <div className="carousel-item active">
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
                <div className="container">
                    <div className="card-columns">
                        {this.events.map(events => (
                        <div className="card">
                            <img className="card-img-top img-fluid" src="" alt=""/>
                            <div className="card-body">
                                <h5>
                                    {events.title} {events.start_time}
                                </h5>
                            </div>

                        </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    mounted(){
        eventService.getEvents()
            .then(events => (this.events = events))
            .catch((error: Error) => console.log(error.message));
    }
}

export default Home;