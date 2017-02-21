/**
 * Created by Administrator on 2017-2-13.
 */
import RUI from "react-component-lib";
import Layout from "../../components/layout";
import Pager from "../../components/pager";
import LabelInput from "../../components/label-input";
import "../../../css/page/department-management.scss";
const Depart = React.createClass({
    getInitialState(){
        return{
            title : "添加部门",
            request : {
                name : "",
                function : ""
            }
        }
    },
    doPage(){

    },
    add(){
        this.setState({
            title : "添加部门"
        },()=>{
            this.refs.dialog.show();
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
    modify(){
        this.setState({
            title : "修改部门"
        },()=>{
            this.refs.dialog.show();
        });
    },
    delete(){
        RUI.DialogManager.confirm({
            message:'您确定要删除吗？?',
            title:'删除部门',
            submit:function() {
                console.log(222)
            },
        });
    },
   render(){
       return(
           <Layout currentKey = {"1"} defaultOpen={"0"} bread = {["部门成员","部门管理"]}>
               <div className="depart-content">
                   <div className="tbn-div">
                       <RUI.Button className="add-btn primary" onClick = {this.add}>添加</RUI.Button>
                   </div>
                   <table>
                       <thead>
                           <tr>
                               <td>部门名称</td>
                               <td>部门职能</td>
                               <td>操作方式</td>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td>裁剪部</td>
                               <td>裁剪鞋料</td>
                               <td>
                                   <a href="javascript:;" className="handle-a" onClick = {this.modify}>修改</a>
                                   <a href="javascript:;" className="handle-a" onClick = {this.delete}>删除</a>
                               </td>
                           </tr>
                           <tr>
                               <td>裁剪部</td>
                               <td>裁剪鞋料</td>
                               <td>
                                   <a href="javascript:;" className="handle-a">操作</a>
                                   <a href="javascript:;" className="handle-a">删除</a>
                               </td>
                           </tr>
                       </tbody>

                   </table>
                   <Pager></Pager>
                   <RUI.Dialog ref="dialog" title={this.state.title} draggable={false} buttons="submit,cancel" onCancel={this.dialogCancel} onSubmit={this.dialogSubmit}>
                       <div style={{width:'400px', wordWrap:'break-word'}}>
                           <LabelInput require={true} onChange = {this.handleInput.bind(this,"name")} label = "部门名称："></LabelInput>
                           <div className="m-t-10">
                               <label htmlFor="" className="left-label left">部门职能：</label>
                               <RUI.Textarea onChange = {this.handleInput.bind(this,"function")}   className ="w-245"></RUI.Textarea>
                           </div>
                       </div>
                   </RUI.Dialog>
               </div>
           </Layout>
       )
   }
});
module.exports = Depart;