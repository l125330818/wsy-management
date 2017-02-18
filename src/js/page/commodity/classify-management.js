/**
 * Created by Administrator on 2017-2-13.
 */
import RUI from "react-component-lib";
import Layout from "../../components/layout";
import Pager from "../../components/pager";
import "../../../css/page/department-management.scss";
const Depart = React.createClass({
    doPage(){

    },

    render(){
        return(
            <Layout currentKey = {"4"} defaultOpen={"1"} bread = {["产品库存","分类管理"]}>
                <div className="depart-content">
                    <div className="tbn-div">
                        <RUI.Button className="add-btn primary">添加</RUI.Button>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <td>类别名称</td>
                            <td>操作方式</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>裁剪鞋料</td>
                            <td>
                                <a href="javascript:;" className="handle-a">操作</a>
                                <a href="javascript:;" className="handle-a">删除</a>
                            </td>
                        </tr>
                        <tr>
                            <td>裁剪鞋料</td>
                            <td>
                                <a href="javascript:;" className="handle-a">操作</a>
                                <a href="javascript:;" className="handle-a">删除</a>
                            </td>
                        </tr>
                        </tbody>

                    </table>
                    <Pager></Pager>
                </div>
            </Layout>
        )
    }
});
module.exports = Depart;