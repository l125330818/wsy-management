/**
 * Created by luojie on 2017/2/9 16:37.
 */
import { Router, Route, hashHistory } from 'react-router';
import Nav from "./nav-bar";
const Layout = React.createClass({
    render(){
        return(
            <div>
                <Nav></Nav>
            </div>
        )
    }
});
module.exports = Layout;
