
// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
import { Button } from '../components/widgets';
import { Modal } from 'react-bootstrap';
import { cancelEventSerivce, Event} from "../services/TempCancelEventService";

const history = createHashHistory();

class CancelEvent extends Component < { match: { params: { id: number } } }> {

    event: Event = null;

    state = {
        showModal: false,
        setShowModal: false
    };

    show = () => {
        this.setState({ setModalShow: true });
    };

    close = () => {
        this.setState({ setModalShow: false });
    };

    render() {

        return (

            <div>

                <Button.Red onClick={this.show}>Avlys arrangement</Button.Red>

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

    }

    cancelEvent() {
        cancelEventSerivce
            .cancelEvent(this.event.event_id)
            .catch((error: Error) => console.log(error));
    }

}