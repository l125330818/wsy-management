'use strict';
import "./css/app.scss";
import { Router, Route, hashHistory } from 'react-router';
import Layout from "./js/components/layout"
//最终渲染
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path='/' component={Layout}></Route>
    </Router>
), document.getElementById('app'));
