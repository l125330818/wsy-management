/**
 * Created by Administrator on 2017-2-13.
 */
import Layout from "../../components/layout";
import LabelInput from "../../components/label-input";
import {hashHistory} from "react-router"
import "../../../css/page/department-management.scss";
const Depart = React.createClass({
    getInitialState(){
        return{
            title : "",
            numTitle : "",
        }
    },
    handleSelect(e){
        console.log(e);
        let key = e.value;
        switch(key*1){
            case 1:
                this.refs.dialogDetail.show();
                break;
            case 2:
                this.setState({title:"产品出库",numTitle:"出库数量"},()=>{
                    this.refs.dialogOutPut.show();
                });
                break;
            case 3:
                this.setState({title:"产品入库",numTitle:"入库数量"},()=>{
                    this.refs.dialogOutPut.show();
                });
                break;
            case 4:
                hashHistory.push("/stock/detail");
        }
    },
    outPut(){
        return false;
    },
    handleInput(){},
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
                    <table className="table">
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
                                    callback = {this.handleSelect}
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
                    <RUI.Dialog ref="dialogDetail" title="库存详情" draggable={false} buttons="submit" >
                        <div style={{width:'400px', wordWrap:'break-word'}}>
                            <div className="">
                                <label htmlFor="" className="c">产品信息：</label>
                                <span>120双</span>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>鞋码</td>
                                            <td>库存</td>
                                            <td>库存区间</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>35</td>
                                            <td>20</td>
                                            <td>10-100</td>
                                        </tr>
                                        <tr>
                                            <td>35</td>
                                            <td>20</td>
                                            <td>10-100</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </RUI.Dialog>
                    <RUI.Dialog ref="dialogOutPut" title={this.state.title} draggable={false} buttons="submit,cancel" onSubmit = {this.outPut}>
                        <div style={{width:'400px', wordWrap:'break-word'}}>
                            <div className="">
                                <label htmlFor="" className="c">产品信息：</label>
                                <span>120双</span>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <td>鞋码</td>
                                        <td>库存</td>
                                        <td>库存区间</td>
                                        <td>{this.state.numTitle}</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>35</td>
                                        <td>20</td>
                                        <td>10-100</td>
                                        <td><RUI.Input></RUI.Input></td>
                                    </tr>
                                    <tr>
                                        <td>35</td>
                                        <td>20</td>
                                        <td>10-100</td>
                                        <td><RUI.Input></RUI.Input></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <LabelInput require={true} onChange = {this.handleInput.bind(this,"name")} label = "经办人："></LabelInput>
                                <div className="m-t-10">
                                    <label htmlFor="" className="left-label left">备注：</label>
                                    <RUI.Textarea onChange = {this.handleInput.bind(this,"function")}   className ="w-245"></RUI.Textarea>
                                </div>
                            </div>
                        </div>
                    </RUI.Dialog>
                </div>
            </Layout>
        )
    }
});
module.exports = Depart;