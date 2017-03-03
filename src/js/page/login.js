/**
 * Created by Administrator on 2017-2-22.
 */
import "../../css/login.scss";
import RUI from "react-component-lib";
import {hashHistory} from "react-router"
const Login = React.createClass({
    componentDidMount(){
        let _this = this;
        let node = ReactDOM.findDOMNode(this.refs.pwd);
        let node1 = ReactDOM.findDOMNode(this.refs.userName);
        //let node = document.querySelectorAll("input"); //返回的是数组对象 NodeList
        //let node1 = document.getElementsByTagName("input");//返回的是类数组对象 HTMLCollection
        //let node2 = [].slice.call(node1) //可以通过[].slice.call方法将类数组对象转化成数组对象

        //(node,node1).addEventListener("keyup",this.listener);
    },
    componentWillUnmount(){
        console.log("un")
        let _this = this;
        let node = ReactDOM.findDOMNode(this.refs.pwd);
        let node1 = ReactDOM.findDOMNode(this.refs.userName);
        //(node,node1).removeEventListener("keyup",this.listener);
    },
    listener(e){
        if(e.keyCode == 13){
            this.login();
        }
    },
    login(){
        $.ajax({
            url:commonBaseUrl+"/login.htm",
            type:"post",
            dataType:"json",
            data:{username:this.refs.userName.getValue(),password:this.refs.pwd.getValue()},
            success(data){
                if(data.success){
                    hashHistory.push("/depart");
                }else{
                    RUI.DialogManager.alert("请输入正确的用户名和密码");
                }
            }
        })
        //hashHistory.push("/depart");
    },
    render(){
        return(
            <div className="login-wrapper">
                <div className="login-box">
                    <h3>WSY</h3>
                    <div className="user-div">
                        <RUI.Input className = "w-280" ref = "userName" placeholder = "用户名"></RUI.Input>
                    </div>
                    <div>
                        <RUI.Input className = "w-280" ref = "pwd" type = "password" placeholder = "密码"></RUI.Input>
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