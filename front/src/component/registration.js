import React from 'react'
import {NavLink} from 'react-router-dom'
import '../index.css'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {FormControl, Button} from 'react-bootstrap'
import {userRegistration} from '../action'

class Registration extends React.Component {
    state = {
        data: []
    };
    registration = () => {
        let {data} = this.state;
        let datas = {
            ...this.state.data
        };
        let formdata = new FormData();
        formdata.append('obj', JSON.stringify(datas));
        formdata.append('pic', data.pic);
        this.props.userRegistration(formdata).then(() => {
            this.props.history.push('/')
        });
    };
    onChangeHandle = (e) => {
        debugger;
        e.stopPropagation();
        e.preventDefault();
        const {name, value} = e.target;
        const {data} = this.state;

        if (name === "pic") {
            data[name] = e.target.files[0];
        }
        else {
            data[name] = value;
        }
        this.setState({
            data
        })
    };

    render() {
        return (
            <div className="registration-wrapper">
                <h2 align="center">Registration</h2>
                <FormControl type="text" name="fName" placeholder="FirstName" onChange={(e) => {
                    this.onChangeHandle(e)
                }}/><br/>
                <FormControl type="text" name="lName" placeholder="LastName" onChange={(e) => {
                    this.onChangeHandle(e)
                }}/><br/>
                <FormControl type="text" name="gender" placeholder="Gender" onChange={(e) => {
                    this.onChangeHandle(e)
                }}/><br/>
                <FormControl type="text" name="dob" placeholder="DOB" onChange={(e) => {
                    this.onChangeHandle(e)
                }}/><br/>
                <FormControl type="text" name="email" placeholder="Email" onChange={(e) => {
                    this.onChangeHandle(e)
                }}/><br/>
                <FormControl type="text" name="password" placeholder="password" onChange={(e) => {
                    this.onChangeHandle(e)
                }}/><br/>
                <FormControl type="file" name="pic" onChange={(e) => {
                    this.onChangeHandle(e)
                }}/><br/>
                <Button bsStyle="info" type="button" onClick={this.registration}>Registration</Button><br/><br/>
                <NavLink to="/">Already have an account? Login</NavLink>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({user: state.user});
const mapDispatchToProps = dispatch => bindActionCreators({userRegistration}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration))