import React from 'react'
import {NavLink} from 'react-router-dom'
import '../index.css';
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {userLogin} from '../action'
import {FormControl, Button} from 'react-bootstrap'

class Login extends React.Component {

    state = {
        credentials: {
            email: "",
            password: ""
        },
        error: ""
    };

//store state on field change
    onChangeHandle = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const {name, value} = e.target;
        const {credentials} = this.state;
        credentials[name] = value;
        this.setState({
            credentials
        })
    };
//login
    login = () => {
        let data={
            ...this.state.credentials
        };
        this.props.userLogin(data).then(()=>{
            this.props.history.push('/main');
        }).catch(()=>{
            this.setState({error:'email or password ids invalid'});
        })
    };

    render() {
        return (
            <div className="login-wrapper">
                <h2 align="center">Login</h2>
                <span>{this.state.error}</span>
                <FormControl type="text" name="email" onChange={(e) => {
                    this.onChangeHandle(e)
                }} placeholder="Username"/><br/>
                <FormControl type="text" name="password" onChange={(e) => {
                    this.onChangeHandle(e)
                }} placeholder="password"/><br/><br/>
                <Button bsStyle="success" id="loginBtn" type="button" onClick={this.login}>Login</Button><br/><br/>
                <NavLink to="/registration">Register for new Account</NavLink>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({loginUser:state.loginUser});
const mapDispatchToProps=(dispatch)=>bindActionCreators({userLogin},dispatch);
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));