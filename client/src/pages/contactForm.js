// @flow

import * as React from "react";
import {Component} from "react-simplified";
import {createHashHistory} from "history";
import {Column} from "../components/widgets";
import {Button} from "../components/widgets";

const history = createHashHistory();

export class ContactForm extends Component {

    render() {

        return (

            <div className="container">

                <div style={{textAlign: 'center'}}>
                    <h1>Kontakt oss</h1>
                    <p>Bruk dette skjemaet for spørsmål, idéer, tilbakemeldinger eller andre henvendelser. </p>
                </div>

                <form className="form-group">

                    <div className={"form-group m-2"}>
                        <label>Navn</label>
                        <p><input
                            className="form-control"
                            type="text"
                            placeholder="Skriv inn fullt navn"
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => this.heading = event.target.value}
                        /></p>
                    </div>

                    <div className={"form-group m-2"}>
                        <label>Epost</label>
                        <p><input
                            className="form-control"
                            type="text"
                            placeholder="Skriv inn din epostadresse"
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => this.heading = event.target.value}
                        /></p>
                    </div>

                    <h4 style={{marginBottom: 12}}>Din henvendelse</h4>

                    <div className={"form-group m-2"}>
                        <label>Hva gjelder det?</label>
                        <p>
                            <select className="form-control" required>
                                <option value="" hidden>Velg emne </option>
                                <option value={1}>Spørsmål</option>
                                <option value={2}>Idéer</option>
                                <option value={3}>Melding om feil/bugs</option>
                        </select></p>
                    </div>

                    <div className={"form-group m-2"}>
                        <label>Melding</label>
                        <p><textarea
                            className="form-control"
                            style={{height: 200}}
                            placeholder="Skriv din melding"
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => this.heading = event.target.value}
                        /></p>
                    </div>

                    <Column width={3}>
                        <Button.Blue onClick={this.sendEmail}>Send</Button.Blue>
                    </Column>

                </form>
            </div>
        )
    }

    sendEmail() {

    }

}
