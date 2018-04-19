import {combineReducers} from 'redux'
import user from './user-reducer'
import loginUser from './user-login'
import blog from './blog-reducer'
import allUser from './user-pic'
import question from './question-reducer'
import userBlogs from './user-blog'
import userQuestion from './user-question'
import blogComment from './blog-comment'
import answer from './answer-reducer'
import userAnswer from './user-answer'
let rootReducer=combineReducers({user:user,loginUser:loginUser,blog:blog,allUser:allUser,question:question,userBlogs:userBlogs,userQuestion:userQuestion,blogComment:blogComment,answer:answer,userAnswer:userAnswer});
export default rootReducer;
