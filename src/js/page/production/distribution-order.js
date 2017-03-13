/**
 * Created by Administrator on 2017-2-25.
 */
import Layout from "../../components/layout";
import LabelInput from "../../components/label-input";
import LabelSelect from "../../components/label-select";
import LabelDate from "../../components/label-date";
import LabelArea from "../../components/label-textarea";
import Upload from "../../components/upload";
import Pubsub from "../../util/pubsub";
import "../../../css/page/order.scss";
import {orderDetail,employeeList} from "../../components/memberAjax";
import Data from "./testData"
let DateFormatter = new RUI.DateFormatter();
export default class Detail extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            list:{
                    produceOrderProductVOs :[]
            },
            employeesList :[]
        };
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.getList();
        this.getEmployee();
    }
    getEmployee(){
        let employeesList = [];
        let _this = this;
        employeeList().then((data)=>{
            data.rows.map((item)=>{
                employeesList.push({key:item.employeeNo,value:item.name});
            });
            _this.setState({employeesList});
        });

    }
    getList(){
        let _this = this;
        let orderNo = this.props.location.query.id;
        orderDetail(orderNo).then((data)=>{
            _this.setState({list:data.produceOrderVO});
        })
    }
    submit(){
        console.log(this.state.list)
    }
    addTable(item,sonIndex,index){
        let {list} = this.state;
        if(sonIndex == item.length-1){
            item.push({shoeNum:0,employeeNo:"",employeeName:"",defaultValue:{key:"请选择",value:""}});
        }else{
            item.splice(index,1);
        }
        this.setState({list});
    }
    tableInput(item,sonIndex,e){
        let {list} = this.state;
        item[sonIndex].shoeNum = e.target.value;
        this.setState({list});
    }
    selectTable(item,sonIndex,e){
        let {list} = this.state;
        item[sonIndex].defaultValue = e;
        this.setState({list});
    }
    render(){
        let _this = this;
        let {list,employeesList} = this.state;
        let produceOrderProductVOs = list.produceOrderProductVOs;
        return(
            <Layout currentKey = "8" defaultOpen={"2"} bread = {["生产管理","生产订单"]}>
                <div className="order-div print">
                    <h3 className="not-print">查看订单</h3>
                    <div className="p-l-100">
                        <div className="m-b-20">
                            <label>订单编号：</label><span className="m-r-20">{list.orderNo}</span>
                            <label>订单名称：</label><span className="m-r-20">{list.orderName}</span>
                            <label>是否加急：</label><span className="m-r-20">{list.isUrgent==1?"是":"否"}</span>
                            <label>交货时间：</label><span className="m-r-20">{list.deliveryTime}</span>
                        </div>
                        <div className="order-content clearfix">
                            {
                                produceOrderProductVOs.map((item,i)=>{
                                    return(
                                        <div className="list left" key = {i}>
                                            <div className = "clearfix">
                                                <label htmlFor="" className = "left-label left"><i className="require">*</i>生产样图：</label>
                                                <img src={item.productUrl} onClick = {this.clickImg} className="upload-img" alt=""/>
                                            </div>
                                            <div className="m-b-20">
                                                <label>产品名称：</label><span>{item.productName}</span>
                                            </div>
                                            <div className="m-t-10">
                                                <label><i className="require">*</i>生产鞋码与数量：</label>
                                                <table className = "table m-t-10 m-b-20">
                                                    {
                                                        item.produceOrderProductDetailVOs.map((item,index)=>{
                                                        return (
                                                        <tr key = {index}>
                                                            <td>
                                                                {item.shoeCode+"码->"+item.shoeNum+"双"}
                                                            </td>
                                                            <td>
                                                                {
                                                                    (function(){
                                                                        if(item.produceOrderProductDistributeDOs.length==0){
                                                                            item.produceOrderProductDistributeDOs.push({shoeNum:0,employeeNo:"",employeeName:"",defaultValue:{key:"请选择",value:""}});
                                                                        }
                                                                        return(
                                                                            item.produceOrderProductDistributeDOs.map((sonItem,sonIndex)=>{
                                                                                    let flag = item.produceOrderProductDistributeDOs.length-1 == sonIndex;
                                                                                    return (
                                                                                        <div className="table-bottom-line" key = {sonIndex}>
                                                                                            <RUI.Select data = {employeesList}
                                                                                                        value = {sonItem.defaultValue}
                                                                                                        callback = {_this.selectTable.bind(_this,item.produceOrderProductDistributeDOs,sonIndex)}
                                                                                                        className = "w-80 rui-theme-1"/>
                                                                                            <span>{sonItem.defaultValue.value}</span>
                                                                                            <RUI.Input value = {sonItem.shoeNum} onChange = {_this.tableInput.bind(_this,item.produceOrderProductDistributeDOs,sonIndex)}
                                                                                                       className = "w-80"/>
                                                                                            <RUI.Button onClick = {_this.addTable.bind(_this,item.produceOrderProductDistributeDOs,sonIndex,index)}>{flag?"添加":"删除"}</RUI.Button>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            )
                                                                        )
                                                                    })()
                                                                }
                                                            </td>
                                                        </tr>
                                                        )
                                                    })
                                                    }
                                                </table>
                                            </div>
                                            <div className="m-b-20">
                                                <label>生产要求：</label><span>没有要求</span>
                                            </div>
                                            <div className="m-b-20">
                                                <label>备注：</label><span>备注一下</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="m-t-30 not-print">
                            <RUI.Button className = "cancel-btn">取消</RUI.Button>
                            <RUI.Button className = "primary" onClick = {this.submit} >打印</RUI.Button>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}