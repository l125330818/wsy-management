/**
 * Created by Administrator on 2017-3-6.
 */
import "../../css/components/upload.scss";
import "../library/ajaxupload.3.5";

import Pubsub from "../util/pubsub";
export default class Upload extends React.Component{
    // 构造
    constructor(props) {
          super(props);
          // 初始状态
          this.state = {
              imgUrl : "",
          };
        this.replace = this.replace.bind(this);
    }

    componentDidMount() {
        let node = $(ReactDOM.findDOMNode(this.refs.upload));
        let edit = this.props.edit || false;
        this.upload(node);
        if(edit){
            setTimeout(()=>{
                this.replace();
            },200);
        }
    }
    upload(node){
        let _this = this;
        new AjaxUpload(node,{
            action: "http://www.bigxigua.com/product/upload.htm",
            name: "upload",
            responseType: "json",
            onComplete:function(e,data){
                if(data.success){
                    _this.setState({imgUrl : data.resultMap.picPath});
                    _this.replace();
                }else{
                    Pubsub.publish("showMsg",["wrong",data.description]);
                }
            }
        });
    }
    replace(){
        let _this = this;
        let node = $(ReactDOM.findDOMNode(this.refs.replace));
        this.upload(node);
    }
    deleteUpload(){
        this.setState({imgUrl:""});
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.url){
            this.setState({imgUrl:nextProps.url});
        }
    }
    render(){
        let {imgUrl} = this.state;
        return(
            <div>
                {
                    imgUrl &&
                    <div className="upload-div relative">
                        <img src={imgUrl} className="upload-img" alt=""/>
                        <div className="mask"></div>
                        <div className = "mask-text">
                            <span className="text" onClick = {this.replace}  ref = "replace">替换</span>
                            <span onClick = {this.deleteUpload}>删除</span>
                        </div>
                    </div>
                }
                <div className="upload-div" ref = "upload">
                    <i className="upload-trigger"/>
                </div>
            </div>
        )
    }

}