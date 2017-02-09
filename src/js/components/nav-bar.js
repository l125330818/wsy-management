/**
 * Created by luojie on 2017/2/9 16:39.
 */
import "../../css/components/nav-bar.scss";
const Nav = React.createClass({
    getInitialState(){
        return{
            navList:[
                {key:"部门成员",isExpand:false,children:[{key:"部门管理"},{key:"成员管理"},{key:"帐号管理"}]},
                {key:"产品库存",isExpand:false,children:[{key:"部门管理"},{key:"成员管理"},{key:"帐号管理"}]},
                {key:"生产管理",isExpand:false,children:[{key:"部门管理"},{key:"成员管理"},{key:"帐号管理"}]},
            ]
        }
    },
    clickNav(item,e){
        let {navList} = this.state;
        item.isExpand = !item.isExpand;
        this.setState({});
    },
    render(){
        let _this = this;
        let {navList} = _this.state;
        return(
            <div className = "nav-div">
                <ul>
                    {
                        navList.map((item,index)=>{
                            let parStyle = "first-li animated ";
                            item.isExpand?parStyle+=" active fadeInDown" : parStyle;
                            return(
                                <li key = {index} onClick = {this.clickNav.bind(_this,item)} className={parStyle}>
                                    <a href="javascript:;">{item.key}</a>
                                    <ul className="se-ul">
                                        {
                                            item.children.map((item,index)=>{
                                                return(
                                                    <li onClick = {(e)=>{e.stopPropagation();}} key ={index}><a href="javascript:;">{item.key}</a></li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <i className="more"></i>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
});
module.exports = Nav;