/**
 * Created by Administrator on 2017-2-13.
 */
import Layout from "../../components/layout";
import "../../../css/page/department-management.scss";
const Depart = React.createClass({
    render(){
        return(
            <Layout currentKey = "6" defaultOpen={"1"} bread = {["产品库存","库存管理"]}>
                <div className="depart-content">
                    <div className="tbn-div">
                        <label htmlFor="">分类：</label>
                        <RUI.Select
                            data={[{key:'拉丁',value:'1'}, {key:'爵士',value:'2'}, {key:'民族',value:'3'}]}
                            value={{key:'全部',value:'1'}}
                            stuff={true}
                            className="rui-theme-1 w-120">
                        </RUI.Select>
                        <label htmlFor="">产品名称：</label>
                        <RUI.Select
                            data={[{key:'黑色',value:'1'}, {key:'红色',value:'2'}, {key:'黄色',value:'3'}]}
                            value={{key:'全部',value:'1'}}
                            stuff={true}
                            className="rui-theme-1 w-120">
                        </RUI.Select>
                        <label htmlFor="">状态：</label>
                        <RUI.Select
                            data={[{key:'正常',value:'1'}, {key:'异常',value:'2'}]}
                            value={{key:'全部',value:'1'}}
                            stuff={true}
                            className="rui-theme-1 w-120">
                        </RUI.Select>
                        <RUI.Input className = "w-150 m-l-20"></RUI.Input>
                        <RUI.Button className="primary">搜索</RUI.Button>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <td>产品图片</td>
                            <td>产品名称</td>
                            <td>所属分类</td>
                            <td>适用性别</td>
                            <td>适用人群</td>
                            <td>库存总量</td>
                            <td>状态</td>
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
                            <td>异常</td>
                            <td>
                                <RUI.Select
                                    data={[{key:'库存详情',value:'1'}, {key:'出库',value:'2'}, {key:'入库',value:'3'}, {key:'出入库明细',value:'4'}, {key:'库存设置',value:'5'}]}
                                    value={{key:'库存详情',value:'1'}}
                                    stuff={true}
                                    className="rui-theme-1 w-120">
                                </RUI.Select>
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
                            <td>异常</td>
                            <td>
                                <RUI.Select
                                    data={[{key:'库存详情',value:'1'}, {key:'出库',value:'2'}, {key:'入库',value:'3'}, {key:'出入库明细',value:'4'}, {key:'库存设置',value:'5'}]}
                                    value={{key:'库存详情',value:'1'}}
                                    stuff={true}
                                    className="rui-theme-1 w-120">
                                </RUI.Select>
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