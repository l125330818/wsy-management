/**
 * Created by Administrator on 2017-2-13.
 */
/**
 * Created by Administrator on 2017-2-13.
 */
import Layout from "../components/layout";
import { Button } from 'antd';
import "../../css/page/department-management.scss";
const Depart = React.createClass({
    render(){
        return(
            <Layout currentKey = "2" bread = {["部门成员","成员管理"]}>
                <div className="depart-content">
                    <div className="tbn-div">
                        <Button type="primary" className="add-btn">添加</Button>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <td>部门名称</td>
                            <td>部门职能</td>
                            <td>操作方式</td>
                            <td>操作方式</td>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>裁剪部</td>
                                <td>裁剪鞋料</td>
                                <td>删除</td>
                                <td>删除</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </Layout>
        )
    }
});
module.exports = Depart;