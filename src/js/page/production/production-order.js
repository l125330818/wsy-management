/**
 * Created by Administrator on 2017-2-13.
 */
import Layout from "../../components/layout";
import LabelSelect from "../../components/label-select";
import {hashHistory,Link } from 'react-router';
import "../../../css/page/department-management.scss";
const Depart = React.createClass({
    getInitialState(){
        return{

        }
    },
    create(){
        hashHistory.push("/production/createOrder");
    },
    render(){
        return(
            <Layout currentKey = "8" defaultOpen={"2"} bread = {["生产管理","生产订单"]}>
                <div className="depart-content">
                    <div className="tbn-div h-100">
                        <div>
                            <label htmlFor="">订单编号：</label>
                            <RUI.Input className = "w-150"></RUI.Input>
                            <label htmlFor="">订单名称：</label>
                            <RUI.Input className = "w-150"></RUI.Input>
                            <label htmlFor="">加急：</label>
                            <RUI.Select
                                data={[{key:'全部',value:'1'}, {key:'是',value:'2'}, {key:'否',value:'3'}]}
                                value={{key:'全部',value:'1'}}
                                stuff={true}
                                className="rui-theme-1 w-120">
                            </RUI.Select>
                            <RUI.Button className="primary">搜索</RUI.Button>
                            <RUI.Button className="add-btn primary" onClick = {this.create}>创建</RUI.Button>
                        </div>
                        <div className="m-t-10">
                            <label htmlFor="">裁剪状态：</label>
                            <RUI.Select
                                data={[{key:'全部',value:'1'}, {key:'未处理',value:'2'}, {key:'已完成',value:'3'}]}
                                value={{key:'全部',value:'1'}}
                                stuff={true}
                                className="rui-theme-1 w-120">
                            </RUI.Select>
                            <label htmlFor="">上案状态：</label>
                            <RUI.Select
                                data={[{key:'全部',value:'1'}, {key:'未处理',value:'2'}, {key:'处理中',value:'3'}, {key:'已完成',value:'4'}]}
                                value={{key:'全部',value:'1'}}
                                stuff={true}
                                className="rui-theme-1 w-120">
                            </RUI.Select>
                            <label htmlFor="">下案状态：</label>
                            <RUI.Select
                                data={[{key:'全部',value:'1'}, {key:'未处理',value:'2'}, {key:'处理中',value:'3'}, {key:'已完成',value:'4'}]}
                                value={{key:'全部',value:'1'}}
                                stuff={true}
                                className="rui-theme-1 w-120">
                            </RUI.Select>
                            <label htmlFor="">质检状态：</label>
                            <RUI.Select
                                data={[{key:'全部',value:'1'}, {key:'未处理',value:'2'}, {key:'已完成',value:'3'}]}
                                value={{key:'全部',value:'1'}}
                                stuff={true}
                                className="rui-theme-1 w-120">
                            </RUI.Select>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <td>生产样图</td>
                            <td>订单编号</td>
                            <td>订单名称</td>
                            <td>交货时间</td>
                            <td>双数</td>
                            <td>加急</td>
                            <td>裁剪状态</td>
                            <td>上岸状态</td>
                            <td>下案状态</td>
                            <td>质检状态</td>
                            <td>剩余时间</td>
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
                            <td>35</td>
                            <td>35</td>
                            <td>35</td>
                            <td>35</td>
                            <td>35</td>
                            <td>
                                <Link to={"/commodity/add/?id=3&type=2"} className="handle-a">修改</Link>
                                <a href="javascript:;" className="handle-a" onClick = {this.delete}>删除</a>
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