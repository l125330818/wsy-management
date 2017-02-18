/**
 * Created by Administrator on 2017-2-13.
 */
import Layout from "../../components/layout";
import { Button } from 'antd';
import "../../../css/page/department-management.scss";
const Depart = React.createClass({
    render(){
        return(
            <Layout currentKey = "2" defaultOpen={"0"} bread = {["部门成员","成员管理"]}>
                <div className="depart-content">
                    <div className="tbn-div">
                        <label htmlFor="">部门：</label>
                        <RUI.Select
                            data={[{key:'裁剪部',value:'1'}, {key:'机车部',value:'2'}, {key:'质检部',value:'3'}]}
                            value={{key:'机车部',value:'1'}}
                            stuff={true}
                            className="rui-theme-1 w-120">
                        </RUI.Select>
                        <label htmlFor="">名字：</label>
                        <RUI.Input className = "w-150"></RUI.Input>
                        <RUI.Button className="primary">搜索</RUI.Button>
                        <RUI.Button className="add-btn primary">添加</RUI.Button>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <td>工号</td>
                            <td>名字</td>
                            <td>手机号</td>
                            <td>入职时间</td>
                            <td>部门</td>
                            <td>操作方式</td>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>张三</td>
                                <td>13568763633</td>
                                <td>2017-02-14 22:10:22</td>
                                <td>机车部</td>
                                <td>
                                    <a href="javascript:;" className="handle-a">操作</a>
                                    <a href="javascript:;" className="handle-a">删除</a>
                                </td>
                            </tr>
                            <tr>
                                <td>02</td>
                                <td>李四</td>
                                <td>13568763633</td>
                                <td>2017-02-14 22:10:22</td>
                                <td>机车部</td>
                                <td>
                                    <a href="javascript:;" className="handle-a">操作</a>
                                    <a href="javascript:;" className="handle-a">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="footer">
                        <div className="right">
                            <RUI.Pagination pageSize={10} currentPage={1} totalNum={100} onPage={this.doPage} />
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
});
module.exports = Depart;