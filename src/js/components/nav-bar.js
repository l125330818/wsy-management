/**
 * Created by luojie on 2017/2/9 16:39.
 */
import "../../css/components/nav-bar.scss";
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import {hashHistory } from 'react-router';
const SubMenu = Menu.SubMenu;
const Nav = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState(){
        return{
            navList:[
                {key:"部门成员",type:"team",children:[{key:"部门管理",value:1},{key:"成员管理",value:2},{key:"帐号管理",value:3}]},
                {key:"产品库存",type:"appstore",children:[{key:"分类管理",value:4},{key:"商品管理",value:5},{key:"库存管理",value:6},{key:"出入库管理",value:7}]},
                {key:"生产管理",type:"solution",children:[{key:"生产订单",value:8},{key:"生产管理",value:9}]},
            ],
            currentKey:this.props.currentKey,
        }
    },
    handleClick(e){
        this.setState({
           currentKey: e.key
        },()=>{
            hashHistory.push("/member");
        });

    },
    render(){
        let _this = this;
        let {navList} = _this.state;
        console.log(this.state.currentKey);
        return(
            <div className = "nav-div">
                <div className="info-div">
                    <img src={require("../../images/yeoman.png")} alt=""/>
                </div>
                <Menu
                    theme={"dark"}
                    onClick={this.handleClick}
                    style={{ width: 180 }}
                    defaultOpenKeys={['sub0']}
                    selectedKeys={[this.state.currentKey]}
                    mode="inline"
                >
                    {
                        navList.map((item,index)=>{
                            return(
                                <SubMenu key={"sub"+index} title={<span><Icon type={item.type} /><span>{item.key}</span></span>}>
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