/**
 * Created by luojie on 2017/2/9 16:26.
 */
import "../../css/components/header.scss";
import { Breadcrumb, Icon } from 'antd';
const Header = React.createClass({
    render(){
        return(
            <div>
                <div className="header-div">
                    <h1>wsy管理系统</h1>
                </div>
                <div className="header-bread">
                    <Breadcrumb className = "line-50">
                        <Breadcrumb.Item href="javascript:;">
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="javascript:;">
                            <span>{this.props.bread[0]}</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.props.bread[1]}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="login-out">
                    <a href="#/member">退出</a>
                </div>
            </div>
        )
    }
});
module.exports = Header;