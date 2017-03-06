/**
 * Created by Administrator on 2017-2-13.
 */
import Layout from "../../components/layout";
import LabelInput from "../../components/label-input";
import Pager from "../../components/pager";
import Pubsub from "../../util/pubsub";
import {hashHistory} from "react-router"
import "../../../css/page/department-management.scss";
import {classifyList,productList} from "../../components/memberAjax";
const sexArr = ["","男","女","通用"];
const crowdArr = ["","成人","儿童","通用"];

const Depart = React.createClass({
    getInitialState(){
        return{
            title : "",
            numTitle : "",
            listRequest:{
                id : "",
                classifyId : "",
                status : "",
            },
            pager:{
                currentPage:1,
                pageSize:20,
                totalNum:0,
            },
            list:[],
            stockDetail:[],
            classifySelect : [{key:"全部",value:""}],
            productSelect : [{key:"全部",value:""}],
        }
    },
    componentDidMount(){
        this.getList();
        this.classifyList();
        this.productList();
    },
    getList(pageNo=1){
        let _this = this;
        let {pager,listRequest} = this.state;
        $.ajax({
            url:commonBaseUrl+"/store/findStoreList.htm",
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
                    pager.currentPage = 1
                    pager.totalNum = 0
                    _this.setState({list:[],pager})
                }
            }
        });

    },
    classifyList(){
        let _this = this;
        let {classifySelect} = this.state;
        classifyList().then((result)=>{
            result.rows && result.rows.map((item)=>{
                classifySelect.push({key:item.classifyName,value:item.id})
            });
            _this.setState({classifySelect});
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
    handleSelect(item,e){
        console.log(e);
        let key = e.value;
        switch(key*1){
            case 1:
                this.getStockDetail(item);
                this.refs.dialogDetail.show();
                break;
            case 2:
                this.getStockDetail(item);
                this.setState({title:"产品出库",numTitle:"出库数量"},()=>{
                    this.refs.dialogOutPut.show();
                });
                break;
            case 3:
                this.getStockDetail(item);
                this.setState({title:"产品入库",numTitle:"入库数量"},()=>{
                    this.refs.dialogOutPut.show();
                });
                break;
            case 4:
                hashHistory.push("/stock/detail");
            case 5:
                this.getStockDetail(item);
                this.refs.dialogSet.show();
                break;
        }
    },
    getStockDetail(item){
        let _this = this;
        let {stockDetail} = this.state;
        $.ajax({
            url:commonBaseUrl + "/store/findStoreDetail.htm",
            type : "get",
            dataType:"json",
            data:{d:JSON.stringify({productId:item.id})},
            success(data){
                if(data.success){
                    let stockDetail = data.resultMap.productStoreDOs;
                    _this.setState({stockDetail});
                }else{
                    Pubsub.publish("showMsg",["wrong",data.description]);
                    _this.setState({stockDetail:[]});
                }
            }

        })
    },
    outPut(){
        return false;
    },
    applySex(type){
        return sexArr[type];
    },
    applyCrowd(type){
        return crowdArr[type];
    },
    listSelect(type,e){
        let {listRequest} = this.state;
        listRequest[type] = e.value;
        this.setState({listRequest},()=>{
            this.getList();
        });
    },
    search(){
        this.getList();
    },
    handleInput(){},
    stockSet(){
        let {stockDetail} = this.state;
        let request = [];
        stockDetail.map((item)=>{
            request.push({id:item.id,storeMin:item.storeMin,storeMax:item.storeMax});
        });
        $.ajax({
            url:commonBaseUrl + "/store/updateStoreSet.htm",
            type:"post",
            dataType:"json",
            data:{d:JSON.stringify({productStoreDOs:request})},
            success(data){
                if(data.success){
                    Pubsub.publish("showMsg",["success","设置成功"]);
                }else{
                    Pubsub.publish("showMsg",["wrong",data.description]);
                }
            }
        })
        console.log(this.state.stockDetail)
    },
    stockChange(type,index,e){
        let {stockDetail} = this.state;
        stockDetail[index][type] = e.target.value;
        this.setState({stockDetail});
    },
    render(){
        let {list,productSelect,classifySelect,stockDetail} = this.state;
        return(
            <Layout currentKey = "6" defaultOpen={"1"} bread = {["产品库存","库存管理"]}>
                <div className="depart-content">
                    <div className="tbn-div">
                        <label htmlFor="">分类：</label>
                        <RUI.Select
                            data={classifySelect}
                            value={{key:'全部',value:'1'}}
                            stuff={true}
                            callback = {this.listSelect.bind(this,"classifyId")}
                            className="rui-theme-1 w-120">
                        </RUI.Select>
                        <label htmlFor="">产品名称：</label>
                        <RUI.Select
                            data={productSelect}
                            value={{key:'全部',value:'1'}}
                            stuff={true}
                            callback = {this.listSelect.bind(this,"id")}
                            className="rui-theme-1 w-120">
                        </RUI.Select>
                        <label htmlFor="">状态：</label>
                        <RUI.Select
                            data={[{key:'正常',value:'1'}, {key:'异常',value:'2'}]}
                            value={{key:'全部',value:'1'}}
                            stuff={true}
                            callback = {this.listSelect.bind(this,"status")}
                            className="rui-theme-1 w-120">
                        </RUI.Select>
                        <RUI.Button className="primary" onClick = {this.search}>搜索</RUI.Button>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <td>产品图片</td>
                            <td>产品名称</td>
                            <td>所属分类</td>
                            <td>适用性别</td>
                            <td>适用人群</td>
                            <td>库存总量</td>
                            <td>状态</td>
                            <td>操作方式</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            list.length>0 && list.map((item,index)=>{
                                return(
                                    <tr key = {index}>
                                        <td>
                                            <img className = "commodity-img" src={item.url} alt=""/>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.classifyName}</td>
                                        <td>{this.applySex(item.applySex)}</td>
                                        <td>{this.applyCrowd(item.applyCrowd)}</td>
                                        <td>{item.storeTotalNum}</td>
                                        <td>{item.status==1?"正常":"异常"}</td>
                                        <td>
                                            <RUI.Select
                                                data={[{key:'库存详情',value:'1'}, {key:'出库',value:'2'}, {key:'入库',value:'3'}, {key:'出入库明细',value:'4'}, {key:'库存设置',value:'5'}]}
                                                value={{key:'库存详情',value:'1'}}
                                                stuff={true}
                                                callback = {this.handleSelect.bind(this,item)}
                                                className="rui-theme-1 w-120">
                                            </RUI.Select>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <RUI.Dialog ref="dialogDetail" title="库存详情" draggable={false} buttons="submit" >
                        <div style={{width:'400px', wordWrap:'break-word',maxHeight:"350px",overflow:"auto"}}>
                            <div className="">
                                <label htmlFor="" className="c">产品信息：</label>
                                <span>{stockDetail.length}双</span>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>鞋码</td>
                                            <td>库存</td>
                                            <td>库存区间</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        stockDetail.length>0 && stockDetail.map((item,index)=>{
                                            return(
                                                <tr key = {index}>
                                                    <td>{item.shoeCode}</td>
                                                    <td>{item.shoeNum}</td>
                                                    <td>{(item.storeMin==-1?"无限制":item.storeMin) + "-"+(item.storeMax==-1?"无限制":item.storeMax)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </RUI.Dialog>
                    <RUI.Dialog ref="dialogOutPut" title={this.state.title} draggable={false} buttons="submit,cancel" onSubmit = {this.outPut}>
                        <div style={{width:'400px', wordWrap:'break-word',maxHeight:"350px",overflow:"auto"}}>
                            <div className="">
                                <label htmlFor="" className="c">产品信息：</label>
                                <span>120双</span>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <td>鞋码</td>
                                        <td>库存</td>
                                        <td>库存区间</td>
                                        <td>{this.state.numTitle}</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        stockDetail.length>0 && stockDetail.map((item,index)=>{
                                            return(
                                                <tr key = {index}>
                                                    <td>{item.shoeCode}</td>
                                                    <td>{item.shoeNum}</td>
                                                    <td>{(item.storeMin==-1?"无限制":item.storeMin) + "-"+(item.storeMax==-1?"无限制":item.storeMax)}</td>
                                                    <td><RUI.Input></RUI.Input></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                                <LabelInput require={true} onChange = {this.handleInput.bind(this,"name")} label = "经办人："></LabelInput>
                                <div className="m-t-10">
                                    <label htmlFor="" className="left-label left">备注：</label>
                                    <RUI.Textarea onChange = {this.handleInput.bind(this,"function")}   className ="w-245"></RUI.Textarea>
                                </div>
                            </div>
                        </div>
                    </RUI.Dialog>
                    <RUI.Dialog ref="dialogSet" title="库存设置" draggable={false} onSubmit = {this.stockSet} buttons="submit,cancel" >
                        <div style={{width:'400px', wordWrap:'break-word',maxHeight:"350px",overflow:"auto"}}>
                            <div className="">
                                <label htmlFor="" className="c">产品信息：</label>
                                <span>{stockDetail.length}双</span>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <td>鞋码</td>
                                        <td>最小值</td>
                                        <td>最大值</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        stockDetail.length>0 && stockDetail.map((item,index)=>{
                                            return(
                                                <tr key = {index}>
                                                    <td>{item.shoeCode}</td>
                                                    <td><RUI.Input onChange = {this.stockChange.bind(this,"storeMin",index)}
                                                                   value = {item.storeMin}></RUI.Input></td>
                                                    <td><RUI.Input onChange = {this.stockChange.bind(this,"storeMax",index)}
                                                                   value = {item.storeMax}></RUI.Input></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </RUI.Dialog>
                </div>
            </Layout>
        )
    }
});
module.exports = Depart;