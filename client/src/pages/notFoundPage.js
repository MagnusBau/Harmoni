// @flow

import * as React from 'react';
import { Component } from 'react-simplified';


export class NotFoundPage extends Component {
    render() {
        return (
            <div>
                <h1>404 - Page not found</h1>
                <p>Sorry, the page you are looking for could not be found.</p>
                <p>Return to </p>
                <a href="/#">homepage</a>
            </div>
        );
    }
}