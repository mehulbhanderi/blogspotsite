import React from 'react'
import {Card, CardHeader} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {answerByUser} from '../../action'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'

class UserAnswer extends React.Component {


    componentWillMount() {
        debugger;
        let data={
            user:localStorage.getItem('user')
        };
        this.props.answerByUser(data);
    }


    getPicOfUsers = (user) => {
        let pic="";
        this.props.allUser.map((v,i)=>{
            if(user===v._id){
                pic=v.pic
            }
            return null;
        });
        return "http://192.168.200.33:3002/upload/" + pic;
    };

    render() {
        return (
            <div>
                <div className="col-sm-10">
                    <MuiThemeProvider>
                        <div>
                            {this.props.userAnswer.map((v, i) => {
                                // if(v.user===localStorage.getItem('user')){
                                return <div>
                                    <Card>
                                        <CardHeader
                                            title={v.answer}
                                            // subtitle={v.questionTopic}
                                            actAsExpander={true}
                                            showExpandableButton={true}
                                            subtitleStyle={{fontFamily:"Calibri"}}
                                            subtitleColor="blue"
                                            avatar={this.getPicOfUsers(v.user)}
                                        />
                                    </Card>
                                </div>
                                // }
                            })
                            }
                        </div>
                    </MuiThemeProvider>
                </div>
                <div className="col-sm-2">
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({loginUser: state.loginUser, allUser: state.allUser, userAnswer:state.userAnswer});
const mapPropsToDipatch = dispatch => bindActionCreators({answerByUser}, dispatch);
export default withRouter(connect(mapStateToProps, mapPropsToDipatch)(UserAnswer));