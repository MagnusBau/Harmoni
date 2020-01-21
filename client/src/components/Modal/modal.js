
// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {Modal} from "react-bootstrap";


//TODO gjøres om til vanlig boostrap?
export class ModalWidget extends Component < { show: () => mixed, onHide: () => mixed, title: string, body: string, children: React.Node  } > {

    render() {
        return (

            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>
                        {this.props.body}
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    {this.props.children}
                </Modal.Footer>

            </Modal>
        )
    }
}