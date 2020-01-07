// @flow

import * as React from 'react';
import { Component } from 'react-simplified';

/**
 * Class for the view of Home-page
 *
 * @author Victoria Blichfeldt
 */
class Home extends Component {
    render(){
        return (
            <div>
                <div id="carouselWithControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <img  className="card-img" src="from database" alt"" style=""/>
                                <div className="card-img-overlay text-center">
                                    arrangement title hentes fra db
                                </div>
                            </div>
                        </div>
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
                <div className="container">
                    <div className="card-columns">
                        //hente fra db
                        <div className="card">
                            <img className="card-img-top img-fluid" src="img fra db" alt=""/>
                            <div className="card-body">
                                <h5>
                                    fra db arrangement tittel
                                </h5>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    mounted(){
        //hente forskjellig arrangementer i dra service
    }
}

export default Home;
