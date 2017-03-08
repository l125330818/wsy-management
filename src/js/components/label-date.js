/**
 * Created by Administrator on 2017-2-19.
 */
const Input = React.createClass({
    render(){
        return(
            <div className = "m-t-10 clearfix">

                <label className = "left-label left">
                    {
                        this.props.require &&
                        <i className="require">*</i>
                    }
                    {this.props.label || ""}</label>
                <RUI.DatePicker
                    value = {this.props.value}
                    className = "left"
                    formatter={new RUI.DateFormatter("Y-m-d")}
                    onChange = {(e)=>{this.props.onChange && this.props.onChange(e)}}/>
            </div>
        )
    }
});
module.exports = Input;