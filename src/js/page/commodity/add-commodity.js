/**
 * Created by luojie on 2017/2/18 11:17.
 */

import Layout from "../../components/layout";
import LabelInput from "../../components/label-input";
import LabelSelect from "../../components/label-select";
import  Upload  from 'antd/lib/Upload';
import  Icon  from 'antd/lib/Icon';
import "../../../css/page/add-commodity.scss";
function beforeUpload(file){
    console.log(file)
}
const Add = React.createClass({
    getInitialState(){
        return{
            imageUrl:"",
            fileList:[]
        }
    },
    handleChange(file){
        this.setState({fileList:file.fileList});
    },
   render(){
       let {imageUrl,fileList} = this.state;
       return(
           <Layout currentKey = {"5"} defaultOpen={"1"} bread = {["产品库存","产品管理"]}>
                <div className="add-commodity">
                    <h3>添加商品</h3>
                    <div className = "add-content ">
                        <div className = "clearfix">
                            <label htmlFor="" className = "left-label left"><i className="require">*</i>产品图片</label>
                            <Upload
                                className="avatar-uploader"
                                name="upload"
                                action="http://www.bigxigua.com/product/upload.htm"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={this.handleChange}
                            >
                                {
                                    imageUrl ?
                                        <img src={imageUrl} alt="" className="avatar" /> :
                                        <Icon type="plus" className="avatar-uploader-trigger" />
                                }
                            </Upload>
                        </div>
                        <LabelInput require = {true} label = "产品名称"/>
                        <LabelInput require = {true} label = "产品颜色"/>
                        <LabelSelect
                            require = {true}
                            label = "产品分类"
                            data = {[{key:"拉丁",value:1},{key:"爵士",value:2}]}
                            default = {{key:"拉丁",value:"1"}}/>
                        <LabelSelect
                            require = {true}
                            label = "适用性别"
                            data = {[{key:"男",value:1},{key:"女",value:2},{key:"通用",value:3}]}
                            default = {{key:"男",value:"1"}}/>
                        <LabelSelect
                            require = {true}
                            label = "适用人群"
                            data = {[{key:"成人",value:1},{key:"儿童",value:2},{key:"通用",value:3}]}
                            default = {{key:"成人",value:"1"}}/>
                        <div>
                            <label className="left-label ">
                                <i className="require">*</i>
                                <span>鞋码区间</span>
                            </label>
                            <span>
                                    <RUI.Input className="w-50"/>
                                    <span>----</span>
                                    <RUI.Input className="w-50"/>
                                    <span>码</span>
                            </span>
                        </div>
                        <LabelInput  label = "鞋面材质"/>
                        <LabelInput  label = "鞋底材质"/>
                        <LabelInput  label = "花型"/>
                        <LabelInput  label = "备注"/>
                    </div>
                    <RUI.Button className="add-cancel-btn">取消</RUI.Button>
                    <RUI.Button className="primary">确定</RUI.Button>
                </div>
           </Layout>
       )
   }
});
module.exports = Add;