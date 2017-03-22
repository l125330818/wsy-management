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
import {orderDetail} from "../../components/memberAjax";
import {hashHistory} from "react-router"
import "../../../css/page/order.scss";


let DateFormatter = new RUI.DateFormatter();
export default class Order extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            imgUrl : "",
            deliveryDate : Date.now(),
            defaultSelect:{key:"是",value:"1"},
            request:{
                orderName:"",
                orderNo:"",
                isUrgent:1,
                deliveryTime:DateFormatter.setPattern("Y-m-d").format(Date.now()),

            },
            list:[
                {
                    productName : "",
                    produceAsk : "",
                    productUrl : "",
                    producePrice : "",
                    remark : "",
                    produceOrderProductDetailVOs:[
                        {
                            shoeCode:"",
                            shoeNum:""
                        }
                    ]
                }
            ],
        };
        this.clickImg = this.clickImg.bind(this);
        this.addSonOrder = this.addSonOrder.bind(this);
        this.select = this.select.bind(this);
        this.submit = this.submit.bind(this);
      }

    componentDidMount(){
        let _this = this;
        let query = this.props.location.query;
        let {request} = this.state;
        if(query.id){
            orderDetail(query.id).then((data)=>{
                request.orderName = data.produceOrderVO.orderName;
                request.deliveryTime = data.produceOrderVO.deliveryTime;
                request.isUrgent = data.produceOrderVO.isUrgent;
                let list = data.produceOrderVO.produceOrderProductVOs;
                list.map((item)=>{
                    item.producePrice = (item.producePrice/100).toFixed(2);
                });
                _this.setState({
                    list:data.produceOrderVO.produceOrderProductVOs,
                    deliveryDate: DateFormatter.setSource(data.produceOrderVO.deliveryTime).getTime(),
                    defaultSelect : data.produceOrderVO.isUrgent == 1?{key:"是",value:1}:{key:"否",value:1},
                });
            })
        }

    }
    addLine(index){
        let {list} = this.state;
        list[index].produceOrderProductDetailVOs.push({
            shoeCode:"",
            shoeNum:""
        });
        this.setState({list});
    }
    addSonOrder(){
        let {list} = this.state;
        list.push({
                productName : "",
                produceAsk : "",
                producePrice : "",
                productUrl : "",
                remark : "",
                produceOrderProductDetailVOs:[
                    {
                        shoeCode:"",
                        shoeNum:""
                    }
                ]
            });
        this.setState({list});
    }
    delete(index){
        let {list} = this.state;
        list.splice(index,1);
        this.setState({list});
        console.log(list)
    }
    clickImg(){}
    handleChange(type,e){
        let {request} = this.state;
        request[type] = e.target.value;
    }
    dateChange(e){
        let {request} = this.state;
        request.deliveryTime = DateFormatter.setPattern("Y-m-d").format(e.data);
        this.setState({deliveryDate: e.data});
    }
    select(e){
        let {request} = this.state;
        request.isUrgent = e.value;
        this.setState({});
    }
    submit(){
        let {request,list} = this.state;
        let reList = $.extend(true,[],list);
        let query = this.props.location.query;
        reList.map((item)=>{
            item.produceOrderProductDetailDOs = item.produceOrderProductDetailVOs;
            item.producePrice = item.producePrice*100;
            delete item.produceOrderProductDetailVOs;
            delete item.orderNo;
            delete item.id;
            item.produceOrderProductDetailDOs.map((sItem)=>{
                delete sItem.id;
                delete sItem.orderNo;
                delete sItem.produceOrderProductDistributeDOs;
                delete sItem.produceOrderProductId;
            })
        });
        request.orderNo = query.id || "";
        request.produceOrderProductVOs = reList; //produceOrderProductDetailDOs
        let url = "";
        url = query.id? "/order/update.htm" : "/order/add.htm";
        $.ajax({
            url:commonBaseUrl + url,
            type:"post",
            dataType:"json",
            data:{d:JSON.stringify(request)},
            success(data){
                if(data.success){
                    Pubsub.publish("showMsg",["success",query.id?"修改成功":"创建成功"]);
                    this.timer = setTimeout(()=>{
                        hashHistory.push("/production/order");
                    },2000)
                }else{
                    Pubsub.publish("showMsg",["wrong",data.description]);
                }
            }
        })
    }
    uploadCallback(index,url){
        let {list} = this.state;
        list[index].productUrl = url;
        this.setState({});
    }
    productChange(type,index,e){
        let {list} = this.state;
        list[index][type] = e.target.value;
        this.setState({});
    }
    shoeChange(type,index,sonIndex,e){
        let {list} = this.state;
        list[index].produceOrderProductDetailVOs[sonIndex][type] = e.target.value;
        this.setState({});
    }
    shoeDelete(index,sonIndex){
        let {list} = this.state;
        list[index].produceOrderProductDetailVOs.splice(sonIndex,1);
        this.setState({});
    }
    render(){
        let {imgUrl,list,deliveryDate,request,defaultSelect} = this.state;
        let query = this.props.location.query;
        let editFlag =true;
        if(query.id && (list.vampStatus!=0 || list.tailorStatus!=0 || list.soleStatus!=0 || list.qcStatus!=0)){
            editFlag = false;
        }
        return(
            <Layout currentKey = "8" defaultOpen={"2"} bread = {["生产管理","生产订单"]}>
                <div className="order-div">
                    <h3>{query.id?"修改订单":"创建订单"}</h3>
                    <LabelInput value = {request.orderName} onChange = {this.handleChange.bind(this,"orderName")} label="订单名称：" require = {true}/>
                    <LabelSelect
                        require = {true}
                        label = "是否加急："
                        data = {[{key:"是",value:1},{key:"否",value:2}]}
                        callback = {this.select}
                        default = {defaultSelect}/>
                    <LabelDate
                        value = {deliveryDate}
                        require = {true}
                        label = "交货时间："
                        onChange = {this.dateChange.bind(this)}
                    />
                    {
                        editFlag &&
                        <RUI.Button className = "m-t-10 primary" onClick = {this.addSonOrder}>添加子订单</RUI.Button>
                    }
                    <div className="order-content clearfix">
                        {
                            list.map((item,index)=>{
                                return(
                                    <div className="list left" key = {index}>
                                        {
                                            index!=0 &&
                                            <RUI.Button className = "delete" onClick = {this.delete.bind(this,index)}>删除子订单</RUI.Button>
                                        }
                                        <div className = "clearfix">
                                            <label htmlFor="" className = "left-label left"><i className="require">*</i>生产样图：</label>
                                            <Upload
                                                callback = {this.uploadCallback.bind(this,index)}
                                                uploadBtn = "p-l-100"
                                                disabled = {!editFlag}
                                                onClick = {this.clickImg}
                                                url = {item.productUrl || imgUrl}/>
                                        </div>
                                        <div>
                                            <LabelInput value = {item.productName} label="产品名称："
                                                        disabled = {!editFlag}
                                                        onChange = {this.productChange.bind(this,"productName",index)}
                                                        require = {true}/>
                                        </div>
                                        <div>
                                            <LabelInput value = {item.producePrice} label="产品单价："
                                                        disabled = {!editFlag}
                                                        onChange = {this.productChange.bind(this,"producePrice",index)}
                                                        require = {true}/>
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
                                                    item.produceOrderProductDetailVOs.map((sonItem,sonIndex)=>{
                                                        return(
                                                            <tr key = {sonIndex}>
                                                                <td>
                                                                    <RUI.Input value = {sonItem.shoeCode}
                                                                               disabled = {!editFlag}
                                                                               onChange = {this.shoeChange.bind(this,"shoeCode",index,sonIndex)}
                                                                               className = "w-80"/>
                                                                </td>
                                                                <td>
                                                                    <RUI.Input value = {sonItem.shoeNum}
                                                                               disabled = {!editFlag}
                                                                               onChange = {this.shoeChange.bind(this,"shoeNum",index,sonIndex)}
                                                                               className = "w-80"/>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        editFlag &&
                                                                        <RUI.Button onClick = {this.shoeDelete.bind(this,index,sonIndex)}>删除</RUI.Button>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                            {
                                                editFlag &&
                                                <RUI.Button className="m-t-10 primary" onClick = {this.addLine.bind(this,index)}>添加一行</RUI.Button>
                                            }
                                        </div>
                                        <LabelArea label="生产要求："
                                                   value = {item.produceAsk}
                                                   disabled = {!editFlag}
                                                   onChange = {this.productChange.bind(this,"produceAsk",index)} />
                                        <LabelArea label="备注："
                                                   value = {item.remark}
                                                   disabled = {!editFlag}
                                                   onChange = {this.productChange.bind(this,"remark",index)} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="m-t-30">
                        <RUI.Button className = "cancel-btn">取消</RUI.Button>
                        <RUI.Button className = "primary" onClick = {this.submit}>确定</RUI.Button>
                    </div>
                </div>
            </Layout>
        )
    }
}