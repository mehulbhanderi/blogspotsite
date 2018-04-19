import React from 'react'
import {Card, CardHeader,CardActions,CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Modal from 'react-modal'
import {Button, FormControl,Glyphicon} from 'react-bootstrap'
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import { Scrollbars } from 'react-custom-scrollbars';
import {getAllQuestion, generateQuestion,generateAnswer,getAllAnswer} from '../action'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'

class Question extends React.Component {

    state = {
        expanded:false,
        isQuestion: false,
        currentQuestion:[],
        answerText:""
    };
    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };
    componentWillMount() {
        this.props.getAllQuestion();
        this.props.getAllAnswer();
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

    getUserfromID=(user)=>{
        let name="";
        this.props.allUser.map((v,i)=>{
            if(user===v._id){
                name=v.fName
            }
            return null;
        });
        return name;
    };

    onAnswerChange=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        this.setState({answerText:e.target.value})
    };
    answerQuestion=(id)=> {
        let data = {
            user: localStorage.getItem('user'),
            question: id,
            answer: this.state.answerText
        };
        this.props.generateAnswer(data).then(()=>{
            document.getElementById('comment').value="";
            this.setState({blogCommentText:""});
        });
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
                <div className="col-sm-2">
                </div>
                <div className="col-sm-8">
                    <MuiThemeProvider>
                        <div>
                            <FloatingActionButton className="blog-btn" iconStyle={{backgroundColor: 'brown'}}
                                                  onClick={this.toggleModal}>
                                <ContentAdd/>
                            </FloatingActionButton>
                            {this.props.question.map((v, i) => {
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
                                        <CardActions actAsExpander={true}>
                                            <FlatButton actAsExpander={true}><Glyphicon glyph="glyphicon glyphicon-pencil"/></FlatButton>
                                        </CardActions>
                                        <CardText expandable={true}>
                                            <Scrollbars style={{ height: "70px" }}>
                                                {this.props.answer.map((val, i) => {
                                                    if(v._id===val.question) {
                                                        return<CardText className="blog-comment" key={i} >
                                                            <Avatar
                                                                className="user-avtar"
                                                                src={this.getPicOfUsers(val.user)}
                                                                size={20}
                                                                title={this.getUserfromID(val.user)}
                                                            />
                                                            <b>{this.getUserfromID(val.user)}</b><br/>
                                                            {val.answer}
                                                        </CardText>
                                                    }
                                                })
                                                }
                                            </Scrollbars>
                                        </CardText>
                                        <CardText expandable={true}>
                                            <FormControl componentClass="textarea" id="comment" rows="5" placeholder="Write Your Answer Here" onChange={(e) => {this.onAnswerChange(e)}}/>
                                            <FlatButton style={{backgroundColor:'lightgray'}} onClick={()=>{this.answerQuestion(v._id)}}>Answer</FlatButton>
                                        </CardText>
                                    </Card>
                                </div>
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

const mapStateToProps = (state) => ({loginUser: state.loginUser, allUser: state.allUser, question: state.question,answer:state.answer});
const mapPropsToDipatch = dispatch => bindActionCreators({getAllQuestion, generateQuestion,generateAnswer,getAllAnswer}, dispatch);
export default withRouter(connect(mapStateToProps, mapPropsToDipatch)(Question));