import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Data from '../dashboard'
import Login from '../login'
import Registration from '../registration'
import Question from '../question'
import Answer from '../answer'
import Blog from '../blog'
import Profile from '../userprofile/profile'
import UserQuestion from '../userprofile/user-question'
import UserBlog from '../userprofile/user-blog'
import UserAnswer from '../userprofile/user-answer'
import '../../index.css'
class Main extends React.Component {
    render() {
        //routing before login
        const Public = ({...props}) => {
            return !localStorage.getItem('user') ?
                <div><Route {...props}/></div> :
                <Redirect to="/main"/>
        };
        //routing  after login
        const Private = ({...props}) => {
            return localStorage.getItem('user') ?
                <div><Data/><Route {...props}/></div> :
                <Redirect to="/"/>
        };
        //routing for user profile
        const UserProfile=({...props})=>{
          return localStorage.getItem('user')?
          <div>
          <Data/><Profile/><div className="col-sm-6 user-profile-mid"><Route {...props}/></div>
          </div> : <Redirect to="/"/>
        };
        return (
                <Switch>
                    <Public exact path="/" component={Login}/>
                    <Public exact path="/registration" component={Registration}/>
                    <Private exact path="/question" component={Question}/>
                    <Private exact path="/answer" component={Answer}/>
                    <Private exact path="/blog" component={Blog}/>
                    <Private exact path="/main" component={Question}/>
                    <UserProfile exact path="/profile" component={UserQuestion}/>
                    <UserProfile exact path="/profile/userquestions" component={UserQuestion}/>
                    <UserProfile exact path="/profile/useranswers" component={UserAnswer}/>
                    <UserProfile exact path="/profile/userblogs" component={UserBlog}/>
                    <Private exact path="*" component={Question}/>
                    <Public exact path="*" component={Login}/>
                </Switch>
        );
    }
}

export default (Main);
