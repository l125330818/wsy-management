/**
 * Created by Administrator on 2017-2-13.
 */
import Layout from "../../components/layout";
import LabelInput from "../../components/label-input";
import LabelSelect from "../../components/label-select";
import Pager from "../../components/pager";
import "../../../css/page/department-management.scss";
import {departList} from "../../components/memberAjax";
import Pubsub from "../../util/pubsub";
let DateFormatter = new RUI.DateFormatter();
const Depart = React.createClass({
    getInitialState(){
        return{
            title:"添加成员",
            request : {
                id : "",
                departmentId : 1,
                departmentName : "",
                employeeNo : "",
                name : "",
                mobile : "",
                entryTime : DateFormatter.setPattern("Y-m-d").format(Date.now()),
            },
            listRequest:{
                departmentId : "",
                name : "",
            },
            pager:{
                currentPage:1,
                pageSize:20,
                totalNum:0,
            },
            list:[],
            type:"",
            selectValue:[{key:"全部",value:""}],
            defaultSelectValue:{}
        }
    },
    componentDidMount(){
        this.getList();
        this.getDepartList();
    },
    getDepartList(){
        let _this = this;
        let {selectValue} = this.state;
        departList().then((result)=>{
            result.rows && result.rows.map((item)=>{
                selectValue.push({key:item.name,value:item.id})
            });
            _this.setState({selectValue});
        });
    },
    getList(pageNo=1){
        let _this = this;
        let {pager,listRequest} = this.state;
        $.ajax({
            url:commonBaseUrl+"/employee/findByPage.htm",
            type:"get",
            dataType:"json",
            data:{d:JSON.stringify(listRequest),pageNo:pageNo,pageSize:20},
            success(data){
                if(data.success){
                    pager.currentPage = pageNo;
                    pager.totalNum = data.resultMap.iTotalDisplayRecords;
                    _this.setState({
                        list : data.resultMap.rows,
                        pager : pager
                    })
                }else{
                    pager.currentPage = 1;
                    pager.totalNum = 0;
                    _this.setState({list:[],pager})
                }
            }
        });
    },
    add(){
        let {request} = this.state;
        request = {
            id : "",
            departmentId : "",
            departmentName : "",
            employeeNo : "",
            name : "",
            mobile : "",
            entryTime : Date.now(),
        };
        this.setState({title:"添加成员",request,type:"add",defaultSelectValue : {key:"全部",value:""}},()=>{
            this.refs.dialog.show();
        });
    },
    modify(item){
        let {request,defaultSelectValue} = this.state;
        let jsonStr = JSON.stringify(item);
        request = JSON.parse(jsonStr);
        request.entryTime = DateFormatter.setSource(request.entryTime).getTime();
        defaultSelectValue = {key:request.departmentName,value:request.departmentId};
        this.setState({title:"编辑成员",request,type:"edit",defaultSelectValue},()=>{
            this.refs.dialog.show();
        });
    },
    delete(id){
        let _this = this;
        RUI.DialogManager.confirm({
            message:'您确定要删除吗？?',
            title:'删除成员',
            submit:function() {
                $.ajax({
                   url:commonBaseUrl+"/employee/delete.htm",
                    type:"post",
                    dataType:"json",
                    data:{d:JSON.stringify({employeeId:id})},
                    success(data){
                        if(data.success){
                            Pubsub.publish("showMsg",["success","删除成功"]);
                            _this.getList();
                        }else{
                            Pubsub.publish("showMsg",["wrong",data.description]);
                        }
                    }
                });
            },
        });
    },
    dialogSubmit(){
        let _this = this;
        let {type,request} = this.state;
        let jsonStr = JSON.stringify(request);
        let requestJson = JSON.parse(jsonStr);
        requestJson.entryTime = DateFormatter.setPattern("Y-m-d").format(requestJson.entryTime);
        let url = type=="add"?"/employee/add.htm":"/employee/update.htm";
        $.ajax({
            url:commonBaseUrl + url,
            type:"post",
            dataType:"json",
            data:{d:JSON.stringify(requestJson)},
            success(data){
                if(data.success){
                    Pubsub.publish("showMsg",["success",type=="add"?"添加成功":"修改成功"]);
                    _this.getList();
                }else{
                    Pubsub.publish("showMsg",["wrong",data.description])
                }
            }
        });
        console.log(this.state.request);
    },
    handleInput(type,e){
        let {request} = this.state;
        request[type] = e.target.value;
        this.setState({request});
    },
    selectDepart(e){
        let {listRequest} = this.state;
        listRequest.departmentId = e.value;
        this.setState({listRequest});
    },
    nameInput(e){
        let {listRequest} = this.state;
        listRequest.name = e.target.value;
        this.setState({listRequest});
    },
    search(){
        this.getList();
    },
    datePickerChange(e){
        let {request} = this.state;
        request.entryTime = e.data;
    },
    selectFn(e){
        let {request} = this.state;
        request.departmentName = e.key;
        request.departmentId = e.value;
        this.setState({listRequest});
    },
    render(){
        let {list,pager,request,defaultSelectValue,selectValue} = this.state;
        return(
            <Layout currentKey = "2" defaultOpen={"0"} bread = {["部门成员","成员管理"]}>
                <div className="depart-content">
                    <div className="tbn-div">
                        <label htmlFor="">部门：</label>
                        <RUI.Select
                            data={selectValue}
                            value={{key:"全部",value:""}}
                            stuff={true}
                            callback = {this.selectDepart}
                            className="rui-theme-1 w-120">
                        </RUI.Select>
                        <label htmlFor="">名字：</label>
                        <RUI.Input onChange = {this.nameInput} className = "w-150"/>
                        <RUI.Button className="primary" onClick = {this.search}>搜索</RUI.Button>
                        <RUI.Button className="add-btn primary" onClick = {this.add}>添加</RUI.Button>
                    </div>
                    <table className="table">
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
                        {
                            list.length>0 && list.map((item,index)=>{
                                return(
                                    <tr key = {index}>
                                        <td>{item.employeeNo}</td>
                                        <td>{item.name}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.entryTime}</td>
                                        <td>{item.departmentName}</td>
                                        <td>
                                            <a href="javascript:;" className="handle-a" onClick = {this.modify.bind(this,item)}>修改</a>
                                            <a href="javascript:;" className="handle-a" onClick = {this.delete.bind(this,item.id)}>删除</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <Pager onPage ={this.getList} {...pager}/>
                    <RUI.Dialog ref="dialog" title={this.state.title} draggable={false} buttons="submit,cancel" onCancel={this.dialogCancel} onSubmit={this.dialogSubmit}>
                        <div style={{width:'400px', wordWrap:'break-word'}}>
                            <LabelInput placeholder = "请输入工号" require={true} value = {request.employeeNo} onChange = {this.handleInput.bind(this,"employeeNo")} label = "工号："/>
                            <LabelInput placeholder = "请输入名字" require={true} value = {request.name} onChange = {this.handleInput.bind(this,"name")} label = "名字："/>
                            <LabelInput placeholder = "请输入手机号" require={true} value = {request.mobile} onChange = {this.handleInput.bind(this,"mobile")} label = "手机号："/>
                            <div className = "m-t-10 clearfix">
                                <label className = "left-label left"><i className="require">*</i>入职时间</label>
                                <RUI.DatePicker max = {Date.now()}
                                                className = "left"
                                                value={request.entryTime}
                                                formatter={new RUI.DateFormatter("Y-m-d")}
                                                onChange={this.datePickerChange} />
                            </div>
                            <LabelSelect
                                require = {true}
                                label = "部门"
                                data = {selectValue}
                                callback = {this.selectFn}
                                default = {defaultSelectValue}/>

                        </div>
                    </RUI.Dialog>
                </div>
            </Layout>
        )
    }
});
module.exports = Depart;