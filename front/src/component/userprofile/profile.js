import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter,NavLink} from 'react-router-dom'
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
class Profile extends React.Component{

    render(){
        return(
            <MuiThemeProvider>
            <div>
                <div className="col-sm-2">
                </div>
                <div className="col-sm-2">
                    <Avatar
                        className="user-avtar"
                        src={"http://192.168.200.33:3002/upload/" +this.props.loginUser.pic}
                        size={150}
                        style={{marginTop:'10%',marginLeft:'40%'}}
                        title={this.props.loginUser.fName}
                    />
                    <hr/>
                    <ul style={{marginLeft:'30%'}}>
                        <li><h4><NavLink to="/profile/userquestions">Questions</NavLink></h4></li>
                        <li><h4><NavLink to="/profile/useranswers">Answers</NavLink></h4></li>
                        <li><h4><NavLink to="/profile/userblogs">Blogs</NavLink></h4></li>
                    </ul>
                </div>
                <div className="col-sm-6">
                    <h1 className="user-info-h1">{this.props.loginUser.fName} {this.props.loginUser.lName}</h1>
                    {/*<h4>{this.props.loginUser.dob}</h4>*/}
                    <hr style={{marginTop:'10%'}}/>
                </div>
                <div className="col-sm-2">
                </div>
            </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state) =>({loginUser:state.loginUser,blogs: state.blog});
const mapPropsToDipatch = dispatch => bindActionCreators({}, dispatch);
export default withRouter(connect(mapStateToProps, mapPropsToDipatch)(Profile));