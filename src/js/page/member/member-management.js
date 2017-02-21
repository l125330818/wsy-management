/**
 * Created by Administrator on 2017-2-13.
 */
import Layout from "../../components/layout";
import LabelInput from "../../components/label-input";
import LabelSelect from "../../components/label-select";
import "../../../css/page/department-management.scss";
const Depart = React.createClass({
    getInitialState(){
        return{
            title:"添加成员",
            request : {
                departmentId : "",
                departmentName : "",
                employeeNo : "",
                name : "",
                mobile : "",
                entryTime : "",
            }
        }
    },
    add(){
        this.setState({title:"添加成员"},()=>{
            this.refs.dialog.show();
        });
    },
    modify(){
        this.setState({title:"编辑成员"},()=>{
            this.refs.dialog.show();
        });
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
    dialogSubmit(){
        console.log(this.state.request);
    },
    handleInput(type,e){
        let {request} = this.state;
        request[type] = e.target.value;
        this.setState({request});
    },
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
                        <RUI.Button className="add-btn primary" onClick = {this.add}>添加</RUI.Button>
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
                                    <a href="javascript:;" className="handle-a" onClick = {this.modify}>修改</a>
                                    <a href="javascript:;" className="handle-a" onClick = {this.delete}>删除</a>
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
                    <RUI.Dialog ref="dialog" title={this.state.title} draggable={false} buttons="submit,cancel" onCancel={this.dialogCancel} onSubmit={this.dialogSubmit}>
                        <div style={{width:'400px', wordWrap:'break-word'}}>
                            <LabelInput placeholder = "请输入工号" require={true} onChange = {this.handleInput.bind(this,"employeeNo")} label = "工号："></LabelInput>
                            <LabelInput placeholder = "请输入名字" require={true} onChange = {this.handleInput.bind(this,"name")} label = "名字："></LabelInput>
                            <LabelInput placeholder = "请输入手机号" require={true} onChange = {this.handleInput.bind(this,"mobile")} label = "手机号："></LabelInput>
                            <div className = "m-t-10 clearfix">
                                <label className = "left-label left"><i className="require">*</i>入职时间</label>
                                <RUI.DatePicker className = "left" value={Date.now()} formatter={new RUI.DateFormatter("Y-m-d")} onChange={this.datePickerChange} />
                            </div>
                            <LabelSelect
                                require = {true}
                                label = "部门"
                                data = {[{key:"机车部",value:1},{key:"底工部",value:2},{key:"裁剪部",value:3}]}
                                default = {{key:"机车部",value:"1"}}></LabelSelect>

                        </div>
                    </RUI.Dialog>
                </div>
            </Layout>
        )
    }
});
module.exports = Depart;