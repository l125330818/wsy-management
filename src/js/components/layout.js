/**
 * Created by luojie on 2017/2/9 16:37.
 */
import { Router, Route, hashHistory } from 'react-router';
import Nav from "./nav-bar";
import Header from "./header";
window.commonBaseUrl = "http://www.bigxigua.com"
const Layout = React.createClass({
    render(){
        return(
            <div>
                <Nav defaultOpen = {this.props.defaultOpen} currentKey = {this.props.currentKey}></Nav>
                <div className="right-page">
                    <Header bread = {this.props.bread}></Header>
                    <div className ="page-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = Layout;
