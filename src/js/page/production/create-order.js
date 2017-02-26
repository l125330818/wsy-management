/**
 * Created by Administrator on 2017-2-25.
 */
import Layout from "../../components/layout";
import LabelInput from "../../components/label-input";
import LabelSelect from "../../components/label-select";
import LabelDate from "../../components/label-date";
import LabelArea from "../../components/label-textarea";
import { Upload, Icon, message } from 'antd';
import "../../../css/page/order.scss";
export default class Order extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            imageUrl : "",
            list:[{},{}]
        };
      }
    dateChange(e){
        console.log(e)
    }
    beforeUpload(){}
    render(){
        let {imageUrl,list} = this.state;
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
                    <div className="order-content clearfix">
                        {
                            list.map(()=>{
                                return(
                                    <div className="list left">
                                        <div className = "clearfix">
                                            <label htmlFor="" className = "left-label left"><i className="require">*</i>生产样图：</label>
                                            <Upload
                                                className="avatar-uploader left"
                                                name="avatar"
                                                showUploadList={false}
                                                action="/upload.do"
                                                beforeUpload={this.beforeUpload.bind(this)}
                                                onChange={this.handleChange}
                                            >
                                                {
                                                    imageUrl ?
                                                        <img src={imageUrl} alt="" className="avatar" /> :
                                                        <Icon type="plus" className="avatar-uploader-trigger" />
                                                }
                                            </Upload>
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
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <RUI.Input></RUI.Input>
                                                    </td>
                                                    <td>
                                                        <RUI.Input></RUI.Input>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <LabelArea label="生产要求："></LabelArea>
                                        <LabelArea label="备注："></LabelArea>
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