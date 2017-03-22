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
    componentWillReceiveProps(nextProps){
        this.props.location.query = nextProps.location.query;
        this.getList();
    },
    getList(pageNo=1){
        let _this = this;
        let {pager,listRequest} = this.state;
        let query = this.props.location.query;
        let request = $.extend(true,{},listRequest);
        console.log(query)
        request.startTime = request.startTime + " 00:00:00";
        request.endTime = request.endTime + " 23:59:59";
        request.productId = query.id || request.productId;
        $.ajax({
            url:commonBaseUrl+"/store/inputOrOutputList.htm",
            type:"get",
            dataType:"json",
            data:{d:JSON.stringify(request),pageNo:pageNo,pageSize:20},
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
    detail(item){
        let stockDetail = [];
        stockDetail = item.storeBefore;
        let storeAfter = item.storeAfter;
        let storeOperate = item.storeOperate;
        storeAfter.map((item,index)=>{
            stockDetail[index].afterNum = item.shoeNum;
        });
        storeOperate.map((item,index)=>{
            stockDetail[index].operateNum = item.shoeNum;
        });
        this.setState({stockDetail,type:item.type},()=>{
            this.refs.dialogDetail.show();
        });
    },
    render(){
        let query = this.props.location.query;
        let detailType = query.type;
        let {productSelect,pager,list,startValue,endValue,stockDetail,type} = this.state;
        let loginType = localStorage.type;
        var openKey = 0;
        switch (loginType*1){
            case 1 : openKey = 1;break;
            case 3 : openKey = 0;break;
        }
        return(
            <Layout currentKey = {detailType==1?"6":"7"} defaultOpen={openKey+""} bread = {["产品库存",detailType==1?"库存管理":"出入库明细"]}>
                <div className="depart-content">
                    <div className="tbn-div clearfix">
                        <label htmlFor="" className="left">库存操作：</label>
                        <RUI.Select
                            data={[{key:'全部',value:''}, {key:'出库',value:'1'}, {key:'入库',value:'2'}]}
                            value={{key:'全部',value:''}}
                            stuff={true}
                            callback = {this.select.bind(this,"type")}
                            className="rui-theme-1 w-120 left">
                        </RUI.Select>
                        <label htmlFor="" className="left">操作时间：</label>
                        <RUI.DatePicker max = {Date.now()}  className = "left" startValue={startValue} endValue={endValue} formatter={new RUI.DateFormatter("Y-m-d")} range={true} onChange={this.datePickerChange} />
                        {
                            detailType!=1 &&
                            <label htmlFor="" className="left">产品：</label>

                        }
                        {
                            detailType!=1 &&
                            <RUI.Select
                                data={productSelect}
                                value={{key:'全部',value:''}}
                                stuff={true}
                                callback = {this.select.bind(this,"productId")}
                                className="rui-theme-1 w-120 left">
                            </RUI.Select>
                        }
                        <label htmlFor="" className = "left">操作人：</label>
                        <RUI.Input onChange = {this.inputChange.bind(this,"createUser")} className = "w-150 left"/>
                        <RUI.Button className="primary" onClick = {this.search}>搜索</RUI.Button>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            {
                                detailType!=1 &&
                                <td>产品名称</td>
                            }
                            <td>库存操作</td>
                            <td>操作日期</td>
                            <td>操作人</td>
                            <td>操作数量</td>
                            <td>库存总量</td>
                            <td>备注</td>
                            <td>操作方式</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            list.length>0 && list.map((item,index)=>{
                                return(
                                    <tr key = {index}>
                                        {
                                            detailType!=1 &&
                                            <td>{item.productId}</td>
                                        }
                                        <td>{item.type==1?"出库":"入库"}</td>
                                        <td>{item.createTime}</td>
                                        <td>{item.createUser}</td>
                                        <td>{item.storeAfterNum}</td>
                                        <td>{item.storeOperateNum}</td>
                                        <td>{item.remak}</td>
                                        <td>
                                            <a href="javascript:;" className="handle-a" onClick = {this.detail.bind(this,item)}>明细</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        </tbody>
                    </table>
                    {
                        list.length==0 && <div className="no-data">暂时没有数据哦</div>
                    }
                    <Pager onPage ={this.getList} {...pager}/>
                </div>
                <RUI.Dialog ref="dialogDetail" title="操作明细" draggable={false} onSubmit = {this.stockSet} buttons="submit" >
                    <div style={{width:'500px', wordWrap:'break-word',maxHeight:"350px",overflow:"auto"}}>
                        <div className="">
                            <label htmlFor="" className="c">产品信息：</label>
                            <span>{stockDetail.length}双</span>
                            <table className="table">
                                <thead>
                                <tr>
                                    <td>鞋码</td>
                                    <td>原库存</td>
                                    <td>{type==1?"出":"入"}库数量</td>
                                    <td>操作后库存</td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    stockDetail.length>0 && stockDetail.map((item,index)=>{
                                        return(
                                            <tr key = {index}>
                                                <td>{item.shoeCode}</td>
                                                <td>{item.shoeNum}</td>
                                                <td>{item.operateNum}</td>
                                                <td>{item.afterNum}</td>

                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </RUI.Dialog>
            </Layout>
        )
    }
});
module.exports = Detail;