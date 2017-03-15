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
import {orderDetail} from "../../components/memberAjax";
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
        };
        this.submit = this.submit.bind(this);
      }

    componentDidMount() {
        this.getList();
    }
    getList(){
        let _this = this;
        let orderNo = this.props.location.query.id;
        orderDetail(orderNo).then((data)=>{
            _this.setState({list:data.produceOrderVO});
        })
    }
    submit(){
       window.print();
    }
    getTableHtml(produceOrderProductDetailVOs){
        let {list} = this.state;
        if(produceOrderProductDetailVOs.length>0){
            return(
                produceOrderProductDetailVOs.map((item)=>{
                    return (
                        <tr>
                            <td>
                                {item.shoeCode+"码->"+item.shoeNum+"双"}
                            </td>
                            <td>
                                {
                                    item.produceOrderProductDistributeDOs.map((sonItem)=>{
                                            return (
                                                <div className="table-bottom-line">{sonItem.employeeName}</div>
                                            )
                                        }
                                    )
                                }
                            </td>
                        </tr>
                    )
                })
            )
        }else{
            let arr = [{},{},{}];
            return (
                arr.map(()=>{
                    return (
                        <tr>
                            <td/>
                            <td/>
                        </tr>
                    )
                })
            )
        }
    }
    render(){
        let {list} = this.state;
        let produceOrderProductVOs = list.produceOrderProductVOs;
        return(
            <Layout currentKey = "8" defaultOpen={"2"} bread = {["生产管理","生产订单"]}>
                <div className="order-div print">
                    <h3 className="not-print">查看订单</h3>
                    <div className="p-l-100">
                        <div className="m-b-20">
                            <RUI.Button className = "primary next-btn">上案</RUI.Button>
                            <RUI.Button className = "primary next-btn">下案</RUI.Button>
                        </div>
                        <div className="m-b-20">
                            <label>订单编号：</label><span className="m-r-20">{list.orderNo}</span>
                            <label>订单名称：</label><span className="m-r-20">{list.orderName}</span>
                            <label>是否加急：</label><span className="m-r-20">{list.isUrgent==1?"是":"否"}</span>
                            <label>交货时间：</label><span className="m-r-20">{list.deliveryTime}</span>
                        </div>
                        <div className="m-b-20">
                            <label>创建时间：</label><span className="m-r-20">{list.createTime}</span>
                            <label>裁剪完成时间：</label><span className="m-r-20">{list.tailorFinishTime}</span>
                        </div>
                        <div className="m-b-20">
                            <label>机车分配时间：</label><span className="m-r-20">{list.vampHandleTime}</span>
                            <label>机车完成时间：</label><span className="m-r-20">{list.vampFinishTime}</span>
                        </div>
                        <div className="order-content clearfix">
                            {
                                produceOrderProductVOs.map((item,index)=>{
                                    return(
                                        <div className="list left" key = {index}>
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
                                                        this.getTableHtml(item.produceOrderProductDetailVOs)
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