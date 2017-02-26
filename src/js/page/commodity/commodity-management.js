/**
 * Created by Administrator on 2017-2-13.
 */
import Layout from "../../components/layout";
import {hashHistory,Link } from 'react-router';
import "../../../css/page/department-management.scss";
const Depart = React.createClass({
    getInitialState(){
        return{

        }
    },
    add(){
        hashHistory.push("/commodity/add/")
    },
    delete(){
        RUI.DialogManager.confirm({
            message:'您确定要删除吗？?',
            title:'删除成员',
            submit:function() {
                console.log(222)
            },
        });
    },
    render(){
        return(
            <Layout currentKey = "5" defaultOpen={"1"} bread = {["产品库存","产品管理"]}>
                <div className="depart-content">
                    <div className="tbn-div">
                        <label htmlFor="">分类：</label>
                        <RUI.Select
                            data={[{key:'拉丁',value:'1'}, {key:'爵士',value:'2'}, {key:'民族',value:'3'}]}
                            value={{key:'拉丁',value:'1'}}
                            stuff={true}
                            className="rui-theme-1 w-120">
                        </RUI.Select>
                        <label htmlFor="">名称：</label>
                        <RUI.Input className = "w-150"></RUI.Input>
                        <RUI.Button className="primary">搜索</RUI.Button>
                        <RUI.Button className="add-btn primary" onClick = {this.add}>添加</RUI.Button>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <td>产品图片</td>
                            <td>产品名称</td>
                            <td>所属分类</td>
                            <td>适用性别</td>
                            <td>适用人群</td>
                            <td>鞋码区间</td>
                            <td>操作方式</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <img className = "commodity-img" src={require("../../../images/yeoman.png")} alt=""/>
                            </td>
                            <td>拉丁鞋</td>
                            <td>分类</td>
                            <td>男</td>
                            <td>儿童</td>
                            <td>35</td>
                            <td>
                                <Link to={"/commodity/add/?id=3&type=2"} className="handle-a">修改</Link>
                                <a href="javascript:;" className="handle-a" onClick = {this.delete}>删除</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className = "commodity-img" src={require("../../../images/yeoman.png")} alt=""/>
                            </td>
                            <td>拉丁鞋</td>
                            <td>分类</td>
                            <td>男</td>
                            <td>儿童</td>
                            <td>35</td>
                            <td>
                                <a href="javascript:;" className="handle-a">操作</a>
                                <a href="javascript:;" className="handle-a">删除</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </Layout>
        )
    }
});
module.exports = Depart;