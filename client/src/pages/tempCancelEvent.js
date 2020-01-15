// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from 'history';
import {Button, Column, Row} from '../components/widgets';
import {Modal} from 'react-bootstrap';
//import { cancelEventService, Event} from "../services/TempCancelEventService";
import {eventService, Event} from "../services/eventService";

const history = createHashHistory();

export class CancelEvent extends Component <{ match: { params: { id: number } } }> {

    event: Event = null;

    state = {
        showModal: false,
        setShowModal: false
    };

    show = () => {
        this.setState({setModalShow: true});
    };

    close = () => {
        this.setState({setModalShow: false});
    };

    render() {

        return (

            <div>


                <Column width={2}>

                    <Button.Red onClick={this.show}>Avlys arrangement</Button.Red>

                </Column>

                <Modal
                    show={this.state.setModalShow}
                    onHide={this.close}
                    centered
                >

                    <Modal.Header>

                        <Modal.Title>Advarsel</Modal.Title>

                    </Modal.Header>

                    <Modal.Body>

                        <p>
                            Er du sikker på at du vil avlyse dette arrangementet?
                        </p>

                    </Modal.Body>

                    <Modal.Footer>

                        <Button.Light onClick={this.close}>Lukk</Button.Light>
                        <Button.Red onClick={this.cancelEvent}>Avlys</Button.Red>

                    </Modal.Footer>

                </Modal>

            </div>

        )
    }

    mounted(): void {

        // GET EVENT BY ID METHOD HERE

        eventService
            .getEventID(this.props.match.params.id)
            .then(event => this.event = event[0])
            .catch((error: Error) => Alert(error.message));
    }

    cancelEvent() {
        console.log(this.event.event_id + ": " + this.event);
        eventService
            .cancelEvent(this.event.event_id)
            .catch((error: Error) => console.log(error));

        /* //Temp
        history.push("/");
        console.log("Arrangement avlyst");
         */

    }

}

export default CancelEvent;