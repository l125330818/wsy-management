/**
 * Created by luojie on 2017/2/18 11:17.
 */
import Layout from "../../components/layout";
import { Upload, Icon, message } from 'antd';

import "../../../css/page/add-commodity.scss";
function beforeUpload(file){
    console.log(file)
}
const Add = React.createClass({
    getInitialState(){
        return{
            imageUrl:""
        }
    },
    handleChange(info){
        console.log(info);
    },
   render(){
       let {imageUrl} = this.state;
       return(
           <Layout currentKey = {"5"} defaultOpen={"1"} bread = {["产品库存","产品管理"]}>
                <div className="add-commodity">
                    <h3>添加商品</h3>
                    <div>
                        <label htmlFor=""></label>
                        <Upload
                            className="avatar-uploader"
                            name="avatar"
                            showUploadList={false}
                            action="/upload.do"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {
                                imageUrl ?
                                    <img src={imageUrl} alt="" className="avatar" /> :
                                    <Icon type="plus" className="avatar-uploader-trigger" />
                            }
                        </Upload>
                    </div>
                </div>
           </Layout>
       )
   }
});
module.exports = Add;