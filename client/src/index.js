// @flow

import React from "react";
import ReactDOM from "react-dom";

import { HashRouter, Route } from 'react-router-dom';

import { Home } from "./pages/Home";

import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";


const root = document.getElementById("root");
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <NavBar />
                <Route exact path="/" component={Home} />
                <Footer />
            </div>
        </HashRouter>,
        root
    );
