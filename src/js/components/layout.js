/**
 * Created by luojie on 2017/2/9 16:37.
 */
import { Router, Route, hashHistory } from 'react-router';
import Nav from "./nav-bar";
import Header from "./header";
import Message from "./message";
import Pubsub from "../util/pubsub";
window.commonBaseUrl = "http://www.bigxigua.com"
const Layout = React.createClass({
    getInitialState(){
        return({
            messageType : 'success',
            messageMsg : '',
            enterShop : "",
            shopState : "",
            otherShop:""
        })
    },
    componentDidMount(){
        var _this = this;
        _this.pubsub_token = Pubsub.subscribe('showMsg', function (topic,msgArr) {
            if(msgArr && msgArr.length>=2){
                _this.showMsg(msgArr[0],msgArr[1]);
            }
        });
    },
    componentWillUnmount(){
        this.pubsub_token && Pubsub.unsubscribe(this.pubsub_token);
    },
    showMsg(type, msg) {
        var _this = this;
        window.setTimeout(function() {
            _this.setState({
                messageType : type,
                messageMsg : msg
            },function(){
                _this.refs.message.open();
            });
        },200);
    },
    render(){
        return(
            <div>
                <Nav defaultOpen = {this.props.defaultOpen} currentKey = {this.props.currentKey}></Nav>
                <div className="right-page">
                    <Header bread = {this.props.bread}></Header>
                    <div className ="page-content">
                        {this.props.children}
                    </div>
                    <Message
                        ref="message"
                        type={this.state.messageType}
                        msg={this.state.messageMsg}
                        key={new Date().getTime()}>
                    </Message>
                </div>
            </div>
        )
    }
});
module.exports = Layout;
