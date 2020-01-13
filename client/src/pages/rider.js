//@flow

import * as React from 'react';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
const history = createHashHistory();
import { riderService, Rider} from "../services/riderService";
import Autosuggest from 'react-autosuggest';