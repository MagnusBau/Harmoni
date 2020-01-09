// @flow

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom';
import {Route, Switch} from "react-router";
import Home from "./pages/Home";

import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";


const root = document.getElementById("root");
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
                <Footer />
            </div>
        </HashRouter>,
        root
    );

