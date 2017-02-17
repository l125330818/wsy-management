/**
 * Created by luojie on 2017/2/15 11:19.
 */
const Pager = React.createClass({
   render(){
       return(
           <div className="footer">
               <div className="right">
                   <RUI.Pagination pageSize={10} currentPage={1} totalNum={100} onPage={this.doPage} />
               </div>
           </div>
       )
   }
});
module.exports = Pager;