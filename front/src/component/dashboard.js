import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter,NavLink} from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconMenu from 'material-ui/IconMenu';
import {ToolbarSeparator} from 'material-ui/Toolbar';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import {userLogout,fetchUser,getAllUser} from '../action'
import '../index.css'
const style = {marginLeft: 40,size:"50"};

class Data extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            value: 3,

        };
    }
    logoutUser=()=>{
     this.props.userLogout();
     this.props.history.push('/');
    };

    componentWillMount(){
        let data={
          id:localStorage.getItem('user')
        };
      this.props.fetchUser(data);
        this.props.getAllUser();
    };

    // handleChange = (event, index, value) => this.setState({value});
    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    {/*header*/}
                    <AppBar style={{backgroundColor: 'brown',color:'white'}} title="Blog Spot"
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                            onLeftIconButtonClick={this.handleToggle}>
                        <MenuItem style={{marginTop:'5%' ,padding:'5%'}}><NavLink to="/question"><label style={{color:'white'}}>Question</label></NavLink></MenuItem>
                        <ToolbarSeparator style={{marginTop:'1%'}}/>
                        <MenuItem style={{marginTop:'5%',padding:'5%'}}><NavLink to="/answer"><label style={{color:'white'}}>Answer</label></NavLink></MenuItem>
                        <ToolbarSeparator style={{marginTop:'1%'}}/>
                        <MenuItem style={{marginTop:'5%',padding:'5%'}}><NavLink to="/blog"><label style={{color:'white'}}>Blogs</label></NavLink></MenuItem>
                        <ToolbarSeparator style={{marginTop:'1%'}}/>
                        <MenuItem style={{marginTop:'5%',padding:'5%'}}><NavLink to="/blog"><label style={{color:'white'}}>{this.props.loginUser.fName}</label></NavLink></MenuItem>

                        <ToolbarSeparator style={{marginTop:'1%'}}/>
                        <Chip
                            style={{margin:20,backgroundColor:'brown'}}
                            title={this.props.loginUser.fName}>
                            <IconMenu
                                style={{backgroundColor:'brown', marginTop:'3%'}}
                                iconButtonElement={
                                    <Avatar src={"http://192.168.200.33:3002/upload/" + this.props.loginUser.pic}
                                            size={30}
                                    />
                                }>
                                <div className="avtar-menu">
                                    <MenuItem><NavLink to="/profile">Profile</NavLink></MenuItem>
                                <MenuItem onClick={this.logoutUser} primaryText="Logout"/>

                                </div>
                            </IconMenu>
                        </Chip>
                    </AppBar>

                    {/*sidebar*/}
                    <Drawer width={245} docked={false} openSecondary={false} open={this.state.open}
                            onRequestChange={(open) => this.setState({open})}>


                        <AppBar style={{backgroundColor: 'brown'}}
                                title="DashBoard"
                                iconClassNameRight="muidocs-icon-navigation-expand-more"
                                onLeftIconButtonClick={this.handleToggle}
                        />
                        <Avatar
                            className="user-avtar"
                            src={"http://192.168.200.33:3002/upload/" +this.props.loginUser.pic}
                            size={150}
                            style={style}
                            title={this.props.loginUser.fName}
                        />
                        <MenuItem onClick={this.handleClose}><NavLink to="/main">Your Topics</NavLink></MenuItem>
                        <MenuItem onClick={this.handleClose}><NavLink to="/profile/userquestions">Your Question</NavLink></MenuItem>
                        <MenuItem onClick={this.handleClose}><NavLink to="/profile/useranswers">Your Answer</NavLink></MenuItem>
                        <MenuItem onClick={this.handleClose}><NavLink to="/profile/userblogs">Your Blog</NavLink></MenuItem>

                    </Drawer>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state) =>({loginUser:state.loginUser,allUser:state.allUser});
const mapPropsToDipatch = dispatch => bindActionCreators({userLogout,fetchUser,getAllUser}, dispatch);
export default withRouter(connect(mapStateToProps, mapPropsToDipatch)(Data));