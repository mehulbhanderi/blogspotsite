import React from 'react'
import {Card, CardHeader} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Modal from 'react-modal'
import {Button, FormControl} from 'react-bootstrap'

import {getAllQuestion, generateQuestion,questionbyuser} from '../../action'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'

class UserQuestion extends React.Component {

    state = {
        isQuestion: false,
        currentQuestion:[],
    };

    componentWillMount() {
        this.props.getAllQuestion();
        let data={
            user:localStorage.getItem('user')
        };
        this.props.questionbyuser(data);
    }
    toggleModal = () => {
        this.setState({isQuestion: !this.state.isQuestion});
    };
    onChangeHandle=(e)=>{
        e.stopPropagation();
        e.preventDefault();
        const {name, value} = e.target;
        const {currentQuestion} = this.state;
        currentQuestion[name] = value;
        this.setState({
            currentQuestion
        })
    };
    generateQustion=()=>{
        let data={
            user: localStorage.getItem('user'),
            ...this.state.currentQuestion
        };
        this.props.generateQuestion(data).then(()=>{
            this.toggleModal();
        })
    };
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
                <Modal isOpen={this.state.isQuestion} ariaHideApp={false} style={{
                    overlay: {},
                    content: {
                        height: "50%",
                        marginTop: '3%',
                        marginLeft: '30%',
                        marginRight: '30%',
                        paddingLeft: '1.5%',
                    }
                }}>

                    <h2 align="center">Question</h2>
                    <FormControl type="text" name="questionTopic" placeholder="Question Topic" onChange={(e) => {
                        this.onChangeHandle(e)
                    }}/><br/>

                    <FormControl componentClass="textarea" rows="6" name="question" placeholder="Question Description"
                                 onChange={(e) => {
                                     this.onChangeHandle(e)
                                 }}/><br/>
                    <Button bsStyle="info" className="question-action-btn" type="button"
                            onClick={this.generateQustion}>Ask Question</Button>
                    <Button bsStyle="danger" className="blog-cancel-btn" type="button"
                            onClick={this.toggleModal}>Cancel</Button>

                </Modal>
                <div className="col-sm-10">
                    <MuiThemeProvider>
                        <div>
                            {this.props.userQuestion.map((v, i) => {
                                // if(v.user===localStorage.getItem('user')){
                                return <div>
                                    <Card>
                                        <CardHeader
                                            title={v.question}
                                            subtitle={v.questionTopic}
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

const mapStateToProps = (state) => ({loginUser: state.loginUser, allUser: state.allUser, question: state.question,userQuestion:state.userQuestion});
const mapPropsToDipatch = dispatch => bindActionCreators({getAllQuestion, generateQuestion,questionbyuser}, dispatch);
export default withRouter(connect(mapStateToProps, mapPropsToDipatch)(UserQuestion));