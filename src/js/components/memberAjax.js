/**
 * Created by luojie on 2017/3/2 11:32.
 */
import Pubsub from "../util/pubsub";
export function departList(){
    return $.ajax({
        url:commonBaseUrl+"/department/findByPage.htm",
        type:"get",
        dataType:"json",
        data:{d:"",pageNo:1,pageSize:20},
    }).then((data)=>{
        if(data.success){
            return data.resultMap;
        }else{
            Pubsub.publish("showMsg",["wrong",data.description]);
            return data;
        }
    })
}
export function classifyList(){
    return $.ajax({
        url:commonBaseUrl+"/classify/findByPage.htm",
        type:"get",
        dataType:"json",
        data:{d:"",pageNo:1,pageSize:20},
    }).then((data)=>{
        if(data.success){
            return data.resultMap;
        }else{
            Pubsub.publish("showMsg",["wrong",data.description]);
            return data;
        }
    })
}