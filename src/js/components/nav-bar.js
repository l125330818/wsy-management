/**
 * Created by luojie on 2017/2/9 16:39.
 */
import "../../css/components/nav-bar.scss";
import 'antd/dist/antd.css';
import  Menu  from 'antd/lib/Menu';
import  Icon  from 'antd/lib/Icon';
import {hashHistory } from 'react-router';
const SubMenu = Menu.SubMenu;
const Nav = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState(){
        return{
            navList:[
                {key:"部门成员",type:"team",children:[
                    {key:"部门管理",value:1,path:"/depart"},
                    {key:"成员管理",value:2,path:"/member"},
                    {key:"帐号管理",value:3,path:"/accounts"}]},
                {key:"产品库存",type:"appstore",children:[
                    {key:"分类管理",value:4,path:"/classify"},
                    {key:"商品管理",value:5,path:"/commodity"},
                    {key:"库存管理",value:6,path:"/stock"},{key:"出入库管理",value:7,path:"/accounts"}]},
                {key:"生产管理",type:"solution",children:[
                    {key:"生产订单",value:8,path:"/production/order"},
                    {key:"生产管理",value:9,path:"/accounts"}]},
            ],
            currentKey:this.props.currentKey,
            defaultOpen : this.props.defaultOpen || "0"
        }
    },
    handleClick(e){
        let {navList} = this.state;
        let key = Number(e.keyPath[1]);
        let value = e.keyPath[0];
        let children = navList[key].children;
        let currObj = children.find((item)=>{
            return item.value == value;
        });
        let path = currObj.path;
        this.setState({
           currentKey: e.key,
            defaultOpen : key
        },()=>{
            hashHistory.push(path);
        });
    },
    render(){
        let _this = this;
        let {navList} = _this.state;
        return(
            <div className = "nav-div">
                <div className="info-div">
                    <img src={require("../../images/yeoman.png")} alt=""/>
                </div>
                <Menu
                    theme={"dark"}
                    onClick={this.handleClick}
                    style={{ width: 180 }}
                    defaultOpenKeys={[this.state.defaultOpen]}
                    selectedKeys={[this.state.currentKey]}
                    mode="inline"
                >
                    {
                        navList.map((item,index)=>{
                            return(
                                <SubMenu key={index} title={<span><Icon type={item.type} /><span>{item.key}</span></span>}>
                                    {
                                        item.children.map((childItem)=>{
                                            return(
                                                <Menu.Item key={childItem.value+""}>{childItem.key}</Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            )
                        })
                    }
                </Menu>
            </div>
        )
    }
});
module.exports = Nav;