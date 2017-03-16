/**
 * Created by Administrator on 2017-2-21.
 */
import Layout from "../../components/layout";
import LabelInput from "../../components/label-input";
import LabelSelect from "../../components/label-select";
import Pager from "../../components/pager";
import "../../../css/page/department-management.scss";
import {productList} from "../../components/memberAjax";
let DateFormatter = new RUI.DateFormatter();
const Detail = React.createClass({
    getInitialState(){
        return{
            title:"添加成员",
            productSelect : [{key:"全部",value:""}],
            listRequest:{
                productId : "",
                type : "",
                createUser : "",
                startTime : DateFormatter.setPattern("Y-m-d").format(Date.now()-86400*30*1000),
                endTime : DateFormatter.setPattern("Y-m-d").format(Date.now()),
            },
            startValue :Date.now()-86400*30*1000,
            endValue :Date.now(),
            pager:{
                currentPage:1,
                pageSize:20,
                totalNum:0,
            },
            type : 1,//1==出库，2==入库
            list :[],
            stockDetail :[],
        }
    },
    componentDidMount(){
        this.getList();
        this.productList();
    },
    getList(pageNo=1){
        let _this = this;
        let {pager,listRequest} = this.state;
        let query = this.props.location.query;
        listRequest.startTime = listRequest.startTime + " 00:00:00";
        listRequest.endTime = listRequest.endTime + " 23:59:59";
        listRequest.productId = query.id || "";
        $.ajax({
            url:commonBaseUrl+"/store/inputOrOutputList.htm",
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
                    _this.setState({list:[],pager});
                }
            }
        });

    },
    productList(){
        let _this = this;
        let {productSelect} = this.state;
        productList().then((result)=>{
            result.rows && result.rows.map((item)=>{
                productSelect.push({key:item.name,value:item.id})
            });
            _this.setState({productSelect});
        });
    },
    select(type,e){
        let {listRequest} = this.state;
        listRequest[type] = e.value;
        this.setState({listRequest},()=>{
            this.getList();
        });
    },
    datePickerChange(e){
        let data = e.data;
        let {listRequest} = this.state;
        listRequest.startTime = DateFormatter.setPattern("Y-m-d").format(data.startValue);
        listRequest.endTime = DateFormatter.setPattern("Y-m-d").format(data.endValue);
        this.setState({listRequest,startValue:data.startValue,endValue:data.endValue},()=>{
            this.getList();
        });
    },
    inputChange(type,e){
        let {listRequest} = this.state;
        listRequest[type] = e.target.value;
    },
    search(){
        this.getList();
    },
    render(){
        let {productSelect,pager,list,startValue,endValue,stockDetail,type} = this.state;
        return(
            <Layout currentKey = "9" defaultOpen={"2"} bread = {["生产管理","生产统计"]}>
                <div className="depart-content">
                    <div className="tbn-div clearfix">
                        <label htmlFor="" className="left">操作时间：</label>
                        <RUI.DatePicker max = {Date.now()}  className = "left" startValue={startValue} endValue={endValue} formatter={new RUI.DateFormatter("Y-m-d")} range={true} onChange={this.datePickerChange} />
                        <label htmlFor="">订单名称：</label>
                        <RUI.Input onChange = {this.inputChange.bind(this,"orderName")} className = "w-150"/>
                        <label htmlFor="" className="left">机车员工：</label>
                        <RUI.Select
                            data={productSelect}
                            value={{key:'全部',value:''}}
                            stuff={true}
                            callback = {this.select.bind(this,"productId")}
                            className="rui-theme-1 w-120 left">
                        </RUI.Select>
                        <label htmlFor="" className="left">制底员工：</label>
                        <RUI.Select
                            data={productSelect}
                            value={{key:'全部',value:''}}
                            stuff={true}
                            callback = {this.select.bind(this,"productId")}
                            className="rui-theme-1 w-120 left">
                        </RUI.Select>
                        <RUI.Button className="primary" onClick = {this.search}>搜索</RUI.Button>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <td>订单编号</td>
                            <td>订单名称</td>
                            <td>库存操作</td>
                            <td>交货时间</td>
                            <td>双数</td>
                            <td>加急</td>
                            <td>创建时间</td>
                            <td>裁剪完成时间</td>
                            <td>下案完成时间</td>
                            <td>质检时间</td>
                            <td>操作</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            list.length>0 && list.map((item,index)=>{
                                return(
                                    <tr key = {index}>
                                        <td>{item.productId}</td>
                                        <td>{item.type==1?"出库":"入库"}</td>
                                        <td>{item.createTime}</td>
                                        <td>{item.createUser}</td>
                                        <td>{item.storeAfterNum}</td>
                                        <td>{item.storeOperateNum}</td>
                                        <td>{item.remak}</td>
                                        <td>{item.remak}</td>
                                        <td>{item.remak}</td>
                                        <td>{item.remak}</td>
                                        <td>
                                            <a href="javascript:;" className="handle-a" >查看</a>
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
module.exports = Detail;