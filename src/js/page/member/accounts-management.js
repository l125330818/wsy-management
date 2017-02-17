/**
 * Created by Administrator on 2017-2-13.
 */
import Layout from "../../components/layout";
import { Button } from 'antd';
import "../../../css/page/department-management.scss";
const Depart = React.createClass({
    render(){
        return(
            <Layout currentKey = "3" bread = {["部门成员","帐号管理"]}>
                <div className="depart-content">
                    <div className="tbn-div">
                        <label htmlFor="">部门：</label>
                        <RUI.Select
                            data={[{key:'裁剪部',value:'1'}, {key:'机车部',value:'2'}, {key:'质检部',value:'3'}]}
                            value={{key:'机车部',value:'1'}}
                            stuff={true}
                            className="rui-theme-1 w-120">
                        </RUI.Select>
                        <label htmlFor="">帐号：</label>
                        <RUI.Input className = "w-150"></RUI.Input>
                        <RUI.Button className="primary">搜索</RUI.Button>
                        <RUI.Button className="add-btn primary">添加</RUI.Button>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <td>帐号</td>
                            <td>名字</td>
                            <td>类型</td>
                            <td>操作方式</td>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>张三</td>
                                <td>上岸管理员</td>
                                <td>
                                    <a href="">修改</a>
                                    <a href="">删除</a>
                                </td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>张三</td>
                                <td>上岸管理员</td>
                                <td>
                                    <a href="">修改</a>
                                    <a href="">删除</a>
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