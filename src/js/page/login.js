/**
 * Created by Administrator on 2017-2-22.
 */
import "../../css/login.scss";
import RUI from "react-component-lib";
import {hashHistory} from "react-router"
const Login = React.createClass({
    login(){
        hashHistory.push("/depart");
    },
    render(){
        return(
            <div className="login-wrapper">
                <div className="login-box">
                    <h3>WSY</h3>
                    <div className="user-div">
                        <RUI.Input className = "w-280" placeholder = "用户名"></RUI.Input>
                    </div>
                    <div>
                        <RUI.Input className = "w-280"  type = "password" placeholder = "密码"></RUI.Input>
                    </div>
                    <div className="login-btn">
                        <RUI.Button className = "w-280 green" onClick = {this.login}>登录</RUI.Button>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = Login;