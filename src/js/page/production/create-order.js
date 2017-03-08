/**
 * Created by Administrator on 2017-2-25.
 */
import Layout from "../../components/layout";
import LabelInput from "../../components/label-input";
import LabelSelect from "../../components/label-select";
import LabelDate from "../../components/label-date";
import LabelArea from "../../components/label-textarea";
import Upload from "../../components/upload";
import "../../../css/page/order.scss";
export default class Order extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            imgUrl : "",
            request:{
                orderName:"",
                isUrgent:"",
                deliveryTime:"",

            },
            list:[
                {
                    productName : "",
                    produceAsk : "",
                    productUrl : "",
                    remark : "",
                    produceOrderProductDetailDOs:[
                        {
                            shoeCode:"",
                            shoeNum:""
                        }
                    ]
                }
            ],
        };
        this.clickImg = this.clickImg.bind(this);
      }
    dateChange(e){
        console.log(e)
    }
    beforeUpload(){}
    addLine(){

    }
    clickImg(){}
    render(){
        let {imgUrl,list} = this.state;
        return(
            <Layout currentKey = "8" defaultOpen={"2"} bread = {["生产管理","生产订单"]}>
                <div className="order-div">
                    <h3>创建订单</h3>
                    <LabelInput label="订单名称：" require = {true}/>
                    <LabelSelect
                        require = {true}
                        label = "是否加急："
                        data = {[{key:"是",value:1},{key:"否",value:2}]}
                        default = {{key:"是",value:"1"}}/>
                    <LabelDate
                        require = {true}
                        label = "交货时间："
                        onChange = {this.dateChange.bind(this)}
                    />
                    <RUI.Button className = "m-t-10 primary">添加子订单</RUI.Button>
                    <div className="order-content clearfix">
                        {
                            list.map((item,index)=>{
                                return(
                                    <div className="list left">
                                        {
                                            index!=0 &&
                                            <RUI.Button className = "delete">删除子订单</RUI.Button>
                                        }
                                        <div className = "clearfix">
                                            <label htmlFor="" className = "left-label left"><i className="require">*</i>生产样图：</label>
                                            <Upload uploadBtn = "p-l-100" onClick = {this.clickImg}  url = {imgUrl}/>
                                        </div>
                                        <div>
                                            <LabelInput label="订单名称：" require = {true}/>
                                        </div>
                                        <div className="m-t-10">
                                            <label><i className="require">*</i>生产鞋码与数量：</label>
                                            <table className = "table m-t-10">
                                                <thead>
                                                <tr>
                                                    <td>鞋码</td>
                                                    <td>生产数量</td>
                                                    <td>操作</td>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    item.produceOrderProductDetailDOs.map(()=>{
                                                        return(
                                                            <tr>
                                                                <td>
                                                                    <RUI.Input className = "w-80"/>
                                                                </td>
                                                                <td>
                                                                    <RUI.Input className = "w-80"/>
                                                                </td>
                                                                <td>
                                                                    <RUI.Button>删除</RUI.Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                                </tbody>
                                            </table>
                                            <RUI.Button className="m-t-10 primary" onClick = {this.addLine.bind(this,index)}>添加一行</RUI.Button>
                                        </div>
                                        <LabelArea label="生产要求："/>
                                        <LabelArea label="备注："/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="m-t-30">
                        <RUI.Button className = "cancel-btn">取消</RUI.Button>
                        <RUI.Button className = "primary">确定</RUI.Button>
                    </div>
                </div>
            </Layout>
        )
    }
}