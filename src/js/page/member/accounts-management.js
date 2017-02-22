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
            title:"添加帐号",
            request : {
                username : "",
                mobile : "",
                realname : "",
                type : 1,
            }
        }
    },
    add(){
        this.refs.dialog.show();
    },
    dialogSubmit(){
        console.log(this.state.request);
    },
    handleInput(type,e){
        let {request} = this.state;
        request[type] = e.target.value;
        this.setState({});
    },
    modify(){
        this.refs.pwddialog.show();
    },
    delete(){
        RUI.DialogManager.confirm({
            message:'您确定要删除吗？?',
            title:'删除帐号',
            submit:function() {
                console.log(222)
            },
        });
    },
    pwddialogSubmit(){},
    render(){
        return(
            <Layout currentKey = "3" defaultOpen={"0"} bread = {["部门成员","帐号管理"]}>
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
                        <RUI.Button className="add-btn primary" onClick = {this.add}>添加</RUI.Button>
                    </div>
                    <table className="table">
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
                                    <a href="javascript:;" className="handle-a" onClick = {this.modify}>修改</a>
                                    <a href="javascript:;" className="handle-a" onClick = {this.delete}>删除</a>
                                </td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>张三</td>
                                <td>上岸管理员</td>
                                <td>
                                    <a href="javascript:;" className="handle-a">操作</a>
                                    <a href="javascript:;" className="handle-a">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <RUI.Dialog ref="dialog" title={"添加帐号"} draggable={false} buttons="submit,cancel" onSubmit={this.dialogSubmit}>
                        <div style={{width:'400px', wordWrap:'break-word'}}>
                            <LabelInput placeholder = "请输入帐号" require={true} onChange = {this.handleInput.bind(this,"employeeNo")} label = "帐号："></LabelInput>
                            <LabelInput placeholder = "请输入姓名" require={true} onChange = {this.handleInput.bind(this,"name")} label = "姓名："></LabelInput>
                            <LabelSelect
                                require = {true}
                                label = "类型"
                                data = {[{key:"上岸管理员",value:1},{key:"下案管理员",value:2},{key:"质检管理员",value:3}]}
                                default = {{key:"上岸管理员",value:"1"}}></LabelSelect>
                        </div>
                    </RUI.Dialog>
                    <RUI.Dialog ref="pwddialog" title={"修改密码"} draggable={false} buttons="submit,cancel" onSubmit={this.pwddialogSubmit}>
                        <div style={{width:'400px', wordWrap:'break-word'}}>
                            <LabelInput value = "aaa" disabled = {true} require={true} label = "帐号："></LabelInput>
                            <LabelInput placeholder = "请输入密码" require={true} onChange = {this.handleInput.bind(this,"name")} label = "密码："></LabelInput>
                        </div>
                    </RUI.Dialog>
                </div>
            </Layout>
        )
    }
});
module.exports = Depart;