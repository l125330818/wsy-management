/**
 * Created by Administrator on 2017-2-13.
 */
import Layout from "../../components/layout";
import LabelSelect from "../../components/label-select";
import Pager from "../../components/pager";
import {hashHistory,Link } from 'react-router';
import "../../../css/page/department-management.scss";
let arr = ["未处理","已分配","已完成"]
const Depart = React.createClass({
    getInitialState(){
        return{
            listRequest:{
                orderNo:"",
                orderName:"",
                isUrgent:"",
                tailorStatus:"",
                vampStatus:"",
                soleStatus:"",
                qcStatus:"",
            },
            pager:{
                currentPage:1,
                pageSize:20,
                totalNum:0,
            },
            handleSelect:[{key:"裁剪完成",value:"1"},{key:"机车分配",value:"2"},{key:"机车完成",value:"3"},{key:"查看",value:"4"},{key:"修改",value:"5"},{key:"删除",value:"6"}],
            list:[]
        }
    },
    componentDidMount(){
        this.getList();
    },
    getList(pageNo=1){
        let _this = this;
        let {pager,listRequest} = this.state;
        $.ajax({
            url:commonBaseUrl+"/order/findOrderList.htm",
            type:"get",
            dataType:"json",
            data:{d:JSON.stringify(listRequest),pageNo:pageNo,pageSize:20},
            success(data){
                if(data.success){
                    pager.currentPage = pageNo;
                    pager.totalNum = data.resultMap.iTotalDisplayRecords;
                    _this.setState({
                        list : data.resultMap.rows || [],
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
    create(){
        hashHistory.push("/production/createOrder");
    },
    getType(type){
        return arr[type*1];
    },
    handleListSelect(item,e){
        let value = e.value;
        console.log(e);
        switch(value*1){
            case 2:
                hashHistory.push("/order/distribution?id="+item.orderNo);
                break;
            case 4:
                hashHistory.push("/order/detail?id="+item.orderNo);
                break;
            case 6:
                this.delete(item);
                break;
        }
    },
    delete(item){
        let orderNo = item.orderNo;
        let _this = this;
        RUI.DialogManager.confirm({
            message:'您确定要删除吗？?',
            title:'删除订单',
            submit:function() {
                $.ajax({
                    url:commonBaseUrl + "/order/delete.htm",
                    type:"post",
                    dataType:"json",
                    data:{d:JSON.stringify({orderNo})},
                    success(data){
                        if(data.success){
                            RUI.DialogManager.alert("删除成功");
                            _this.getList();
                        }else{
                            RUI.DialogManager.alert(data.description);
                        }
                    }
                })
            },
        });
    },
    render(){
        let {pager,list,handleSelect} = this.state;
        return(
            <Layout currentKey = "8" defaultOpen={"2"} bread = {["生产管理","生产订单"]}>
                <div className="depart-content">
                    <div className="tbn-div h-100">
                        <div>
                            <label htmlFor="">订单编号：</label>
                            <RUI.Input className = "w-150"/>
                            <label htmlFor="">订单名称：</label>
                            <RUI.Input className = "w-150"/>
                            <label htmlFor="">加急：</label>
                            <RUI.Select
                                data={[{key:'全部',value:''}, {key:'是',value:'1'}, {key:'否',value:'2'}]}
                                value={{key:'全部',value:''}}
                                stuff={true}
                                className="rui-theme-1 w-120">
                            </RUI.Select>
                            <RUI.Button className="primary">搜索</RUI.Button>
                            <RUI.Button className="add-btn primary" onClick = {this.create}>创建</RUI.Button>
                        </div>
                        <div className="m-t-10">
                            <label htmlFor="">裁剪状态：</label>
                            <RUI.Select
                                data={[{key:'全部',value:'1'}, {key:'未处理',value:'2'}, {key:'已完成',value:'3'}]}
                                value={{key:'全部',value:'1'}}
                                stuff={true}
                                className="rui-theme-1 w-120">
                            </RUI.Select>
                            <label htmlFor="">上案状态：</label>
                            <RUI.Select
                                data={[{key:'全部',value:'1'}, {key:'未处理',value:'2'}, {key:'处理中',value:'3'}, {key:'已完成',value:'4'}]}
                                value={{key:'全部',value:'1'}}
                                stuff={true}
                                className="rui-theme-1 w-120">
                            </RUI.Select>
                            <label htmlFor="">下案状态：</label>
                            <RUI.Select
                                data={[{key:'全部',value:'1'}, {key:'未处理',value:'2'}, {key:'处理中',value:'3'}, {key:'已完成',value:'4'}]}
                                value={{key:'全部',value:'1'}}
                                stuff={true}
                                className="rui-theme-1 w-120">
                            </RUI.Select>
                            <label htmlFor="">质检状态：</label>
                            <RUI.Select
                                data={[{key:'全部',value:'1'}, {key:'未处理',value:'2'}, {key:'已完成',value:'3'}]}
                                value={{key:'全部',value:'1'}}
                                stuff={true}
                                className="rui-theme-1 w-120">
                            </RUI.Select>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <td>生产样图</td>
                            <td>订单编号</td>
                            <td>订单名称</td>
                            <td>交货时间</td>
                            <td>双数</td>
                            <td>加急</td>
                            <td>裁剪状态</td>
                            <td>上岸状态</td>
                            <td>下案状态</td>
                            <td>质检状态</td>
                            <td>剩余时间</td>
                            <td>操作方式</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            list.map((item,index)=>{
                                return(
                                    <tr key = {index}>
                                        <td>
                                            <img className = "commodity-img" src={require("../../../images/yeoman.png")} alt=""/>
                                        </td>
                                        <td>{item.orderNo}</td>
                                        <td>{item.orderName}</td>
                                        <td>{item.deliveryTime}</td>
                                        <td>{item.orderNum}</td>
                                        <td>{item.isUrgent==1?"是":"否"}</td>
                                        <td>{item.tailorStatus==0?"未处理":"裁料完成"}</td>
                                        <td>{this.getType(item.vampStatus)}</td>
                                        <td>{this.getType(item.soleStatus)}</td>
                                        <td>{item.qcStatus==0?"未处理":"已处理"}</td>
                                        <td>{item.residueTime}</td>
                                        <td>
                                            <RUI.Select data = {handleSelect}
                                                        className="rui-theme-1 w-120"
                                                        callback = {this.handleListSelect.bind(this,item)}
                                                        stuff={true}/>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        </tbody>
                    </table>
                    <Pager onPage ={this.getList} {...pager}/>
                </div>
            </Layout>
        )
    }
});
module.exports = Depart;