import React from 'react'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import {generateBlog, getAllBlogs, fetchUser, updateBlog,addBlogComment,commentByBlog} from '../action'
import '../index.css'
import {Button, FormControl,Glyphicon} from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardHeader, CardText,CardActions} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import MaterialIcon from 'material-icons-react';
import Avatar from 'material-ui/Avatar';
import { Scrollbars } from 'react-custom-scrollbars';



class Blog extends React.Component {
    state = {
        isBlog: false,
        blog: [],
        currentUser: [],
        allBlogs: [],
        blogCommentText:"",
    };

    componentWillMount() {
        this.props.getAllBlogs();
        this.props.commentByBlog();
    }

    componentWillReceiveProps(nextPorps) {
        this.setState({allBlogs: nextPorps.blogs});
    }

    onChangeHandle = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const {name, value} = e.target;
        const {blog} = this.state;
        blog[name] = value;
        this.setState({
            blog
        })
    };
    getBlogCommentsByBlog=(id,e)=>{
    let data={
        blog:id
    };
    this.props.commentByBlog(data);
};
    blogGenerate = () => {
        this.setState({});
        let data = {
            user: localStorage.getItem('user'),
            ...this.state.blog
        };
        this.props.generateBlog(data).then(() => {
            this.toggleModal();
        });
    };
    toggleModal = () => {
        this.setState({isBlog: !this.state.isBlog});
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

//blog like
    likeBlog=(v,e)=>{
        e.preventDefault();
        e.stopPropagation();
        let user=this.props.loginUser._id;
   if(v.likes.includes(user)){
       v.likes.splice(v.likes.indexOf(user),1);
   }
   else{
       v.likes.push(user);
   }
        let data={
            id:v._id,
            likes:v.likes
        };
        this.props.updateBlog(data);
    };

    // add blog comment
    onCommentChange=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        this.setState({blogCommentText:e.target.value})
    };
    commentBlog=(id)=> {
        let data = {
            user: localStorage.getItem('user'),
            blog: id,
            comment: this.state.blogCommentText
        };
        this.props.addBlogComment(data).then(()=>{
            document.getElementById('comment').value="";
            this.setState({blogCommentText:""});
        });
    };
    render() {
        return (

            <div>
                <Modal isOpen={this.state.isBlog} ariaHideApp={false} style={{
                    overlay: {},
                    content: {
                        height: "70%",
                        marginTop: '3%',
                        marginLeft: '30%',
                        marginRight: '30%',
                        paddingLeft: '1.5%',
                    }
                }}>

                    <h2 align="center">Blog</h2>
                    <FormControl type="text" name="blogTitle" placeholder="Blog Title" onChange={(e) => {
                        this.onChangeHandle(e)
                    }}/><br/>
                    <FormControl type="text" name="blogTopic" placeholder="Blog Topic" onChange={(e) => {
                        this.onChangeHandle(e)
                    }}/><br/>
                    <FormControl componentClass="textarea" rows="12" name="description" placeholder="Blog Description"
                                 onChange={(e) => {
                                     this.onChangeHandle(e)
                                 }}/><br/>
                    <Button bsStyle="info" className="blog-action-btn" type="button"
                            onClick={this.blogGenerate}>Post Blog</Button>
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
                        {this.props.blogs.map((v, i) => {
                            return <div key={i}>
                                <Card >
                                    <CardHeader
                                        title={v.blogTitle}
                                        subtitle={v.blogTopic}
                                        subtitleStyle={{fontFamily:"Calibri"}}
                                        subtitleColor="blue"
                                        actAsExpander={true}
                                        avatar={this.getPicOfUsers(v.user)}
                                        showExpandableButton={true}
                                    />
                                    <CardActions actAsExpander={true}>
                                        <FlatButton onClick={(e)=>{this.likeBlog(v,e)}}>{v.likes.includes(localStorage.getItem('user'))?<MaterialIcon icon="thumb_up" color='black' size='tiny'/>:<span style={{fontSize: "17px"}}><Glyphicon glyph="glyphicon glyphicon-thumbs-up"/></span>}{v.likes.length}</FlatButton>
                                        <FlatButton actAsExpander={true}><Glyphicon glyph="glyphicon glyphicon-comment"/></FlatButton>
                                    </CardActions>
                                    <CardText expandable={true} style={{backgroundColor:'lightgray'}}>
                                        {v.description}
                                    </CardText>
                                    <CardText expandable={true}>
                                    <Scrollbars style={{ height: "200px" }}>
                                        {this.props.blogComment.map((val, i) => {
                                        if(v._id===val.blog) {
                                            return<CardText className="blog-comment" key={i} >
                                                <Avatar
                                                    className="user-avtar"
                                                    src={this.getPicOfUsers(val.user)}
                                                    size={20}
                                                    title={this.getUserfromID(val.user)}
                                                />
                                                <b>{this.getUserfromID(val.user)}</b><br/>
                                                {val.comment}
                                            </CardText>
                                        }
                                    })
                                    }
                                    </Scrollbars>
                                    </CardText>
                                    <CardText expandable={true}>
                                        <FormControl componentClass="textarea" id="comment" rows="2" placeholder="Add comment here" onChange={(e) => {this.onCommentChange(e)}}/>
                                        <FlatButton style={{backgroundColor:'lightgray'}} onClick={()=>{this.commentBlog(v._id)}}>Comment</FlatButton>
                                    </CardText>
                                </Card></div>
                        })}
                        </div>
                    </MuiThemeProvider>

                </div>
                <div className="col-sm-2">
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({blogs: state.blog, loginUser: state.loginUser, allUser: state.allUser,blogComment:state.blogComment});
const mapDispatchToProps = (dispatch) => bindActionCreators({generateBlog, getAllBlogs, fetchUser,updateBlog,addBlogComment,commentByBlog}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));