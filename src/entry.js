'use strict';
import "./css/app.scss";
import { Router, Route, hashHistory } from 'react-router';
import Layout from "./js/components/layout";
import Depart from "./js/page/member/department-management";
//最终渲染
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path='/' component={Depart}></Route>
        <Route path="/member" getComponent={function(nextState, cb) {
                require.ensure([], (require) => {
                     cb(null, require("./js/page/member/member-management"))
                })
            }}/>
        <Route path="/accounts" getComponent={function(nextState, cb) {
                require.ensure([], (require) => {
                     cb(null, require("./js/page/member/accounts-management"))
                })
            }}/>
    </Router>
), document.getElementById('app'));
