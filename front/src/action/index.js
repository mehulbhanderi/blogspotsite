import axiosI from '../service/axios-service'

export const userRegistration=(obj)=>{
   return (dispatch)=>{
     return  axiosI.post('api/blogspot/user',obj).then((response)=>{
            dispatch({
                type:'USER_REGISTRATION',
                payload:response
            });
            return response.data
       })
   }
};

export const userLogin=(data)=>{
    return(dispatch)=>{
     return axiosI({method:'post',url:'api/blogspot/login',data}).then((response)=>{
       dispatch({
           type:'USER_LOGIN',
           payload:response.data
       });
       return response.data
     });
    }
};
export const userLogout=()=>{
    return(dispatch)=>{
          return  dispatch({
                type:'USER_LOGOUT',
            });
    }
};

export const fetchUser=(data)=>{
    return(dispatch)=>{
        return axiosI({method:'post',url:'api/blogspot/fetchById',data}).then((response)=>{
            dispatch({
                type:'USER_DETAIL',
                payload:response.data
            });
            return response.data
        });
    }
};

export const generateBlog=(data)=>{
    return (dispatch)=>{
        return  axiosI({method:'post',url:'api/blogspot/addBlog',data}).then((response)=>{
            dispatch({
                type:'GENERATE_BLOG',
                payload:response.data
            });
            return response.data
        })
    }
};

//update blog
export const updateBlog=(data)=>{
    return (dispatch)=>{
        return  axiosI({method:'post',url:'api/blogspot/updateBlog',data}).then((response)=>{
            dispatch({
                type:'UPDATE_BLOG',
                payload:response.data
            });
            return response.data
        })
    }
};


export const getAllBlogs=()=>{
    return (dispatch)=>{
        return  axiosI({method:'get',url:'api/blogspot/getBlogs'}).then((response)=>{
            dispatch({
                type:'GET_BLOGS',
                payload:response.data
            });
            return response.data
        })
    }
};
export const getAllUser=()=>{
    return (dispatch)=>{
        return  axiosI({method:'get',url:'api/blogspot/getAllUser'}).then((response)=>{
            dispatch({
                type:'GET_ALL_USER',
                payload:response.data
            });
            return response.data
        })
    }
};


//generate Question
export const generateQuestion=(data)=>{
    return (dispatch)=>{
        return  axiosI({method:'post',url:'api/blogspot/addQuestion',data}).then((response)=>{
            dispatch({
                type:'GENERATE_QUESTION',
                payload:response.data
            });
            return response.data
        })
    }
};
//questions list
export const getAllQuestion=()=>{
    return (dispatch)=>{
        return  axiosI({method:'get',url:'api/blogspot/getQuestions'}).then((response)=>{
            dispatch({
                type:'GET_QUESTIONS',
                payload:response.data
            });
            return response.data
        })
    }
};

//get Blogs by user
export const blogbyuser=(data)=>{
    return (dispatch)=>{
        return  axiosI({method:'post',url:'api/blogspot/getBlogByUser',data}).then((response)=>{
            dispatch({
                type:'GET_BLOG_BY_USER',
                payload:response.data
            });
            return response.data
        })
    }
};

//get Blogs by user
export const questionbyuser=(data)=>{
    return (dispatch)=>{
        return  axiosI({method:'post',url:'api/blogspot/getQuestionByUser',data}).then((response)=>{
            dispatch({
                type:'GET_QUESTION_BY_USER',
                payload:response.data
            });
            return response.data
        })
    }
};
//add blog comment
export const addBlogComment=(data)=>{
    return (dispatch)=>{
        return  axiosI({method:'post',url:'api/blogspot/addBlogComment',data}).then((response)=>{
            dispatch({
                type:'BLOG_COMMENT',
                payload:response.data
            });
            return response.data
        })
    }
};

// get comment by blog
export const commentByBlog=()=>{
    return (dispatch)=>{
        return  axiosI({method:'post',url:'api/blogspot/getCommentByBlog'}).then((response)=>{
            dispatch({
                type:'GET_COMMENT_BY_BLOG',
                payload:response.data
            });
            return response.data
        })
    }
};
//generate Answer
export const generateAnswer=(data)=>{
    return (dispatch)=>{
        return  axiosI({method:'post',url:'api/blogspot/addAnswer',data}).then((response)=>{
            dispatch({
                type:'GENERATE_ANSWER',
                payload:response.data
            });
            return response.data
        })
    }
};
//answer list
export const getAllAnswer=()=>{
    return (dispatch)=>{
        return  axiosI({method:'get',url:'api/blogspot/getAllAnswers'}).then((response)=>{
            dispatch({
                type:'GET_ANSWERS',
                payload:response.data
            });
            return response.data
        })
    }
};

//get Blogs by user
export const answerByUser=(data)=>{
    debugger;
    return (dispatch)=>{
        return  axiosI({method:'post',url:'api/blogspot/getAnswerByUser',data}).then((response)=>{
            dispatch({
                type:'GET_ANSWER_BY_USER',
                payload:response.data
            });
            return response.data
        })
    }
};
