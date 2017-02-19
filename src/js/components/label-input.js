/**
 * Created by Administrator on 2017-2-19.
 */
const Input = React.createClass({
    render(){
        return(
            <div className = "m-t-10">

                <label className = "left-label ">
                    {
                        this.props.require &&
                        <i className="require">*</i>
                    }
                    {this.props.label || ""}</label>
                <RUI.Input
                    value = {this.props.value}
                    disabled = {this.props.disabled || false}
                    placeholder = {this.props.placeholder || ""}
                    onChange = {(e)=>{this.props.onChange && this.props.onChange(e)}}></RUI.Input>
            </div>
        )
    }
});
module.exports = Input;