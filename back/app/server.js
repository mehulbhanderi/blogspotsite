let express=require('express');
let bodyParser=require('body-parser');
let mongoose=require('mongoose');
let cors=require('cors');
let fileUpload=require('express-fileupload');
let dbconfig=require('../app/dbconfig/config');
mongoose.connect(dbconfig.url);
let User = require('../app/model/user').User;
let Blog =require('../app/model/blog').Blog;
let Question =require('../app/model/question').Question;
let BlogComment=require('../app/model/comment').BlogComment;
let Answer =require('../app/model/answer').Answer;
let db=mongoose.connection;
let app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static(__dirname + '/'));

//add user
app.post('/api/blogspot/user',(req,res)=>{
    console.log("body",JSON.parse(req.body.obj));
    console.log("file",req.files);

    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let sample = req.files.pic;
    sample.mv(__dirname + '/upload/' + sample.name, (err) => {
        if (err) {
            console.log("Error",err);
        }
    });
    let body=JSON.parse(req.body.obj);
    let user=new User(body);
    user.pic=sample.name;
      user.save().then((result)=>{
          if(result){
              res.send(result);
          }
          console.log(result);
      }).catch((e)=>{
          res.status(400).send(e);
      })
});

//login user
  app.post('/api/blogspot/login',(req,res)=>{
     User.findOne({email:req.body.email,password:req.body.password}).then((result)=>{
         if(result){
             res.send(result);
         }
     }).catch((e)=>{
         res.status(400).send(e);
     })
  });


//find user by Id
app.post('/api/blogspot/fetchById',(req,res)=>{
    User.findOne({_id:req.body.id}).then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

//add blog
app.post('/api/blogspot/addBlog',(req,res)=>{
    let blog=new Blog(req.body);
    blog.save().then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
});
//get all blogs
app.get('/api/blogspot/getBlogs',(req,res)=>{
   Blog.find({status:true}).then((result)=>{
       res.send(result);
   }).catch((e)=>{
       res.status(400).send(e);
   })
});

//get users
app.get('/api/blogspot/getAllUser',(req,res)=>{
    User.find().then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
});


//update blogs
app.post('/api/blogspot/updateBlog',(req,res)=>{
    Blog.findByIdAndUpdate({_id:req.body.id},{$set:req.body},{new:true}).then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

//add Question
app.post('/api/blogspot/addQuestion',(req,res)=>{
    let question=new Question(req.body);
    question.save().then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

//get users
app.get('/api/blogspot/getQuestions',(req,res)=>{
    Question.find().then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

//get blogs by user
app.post('/api/blogspot/getBlogByUser',(req,res)=>{
    Blog.find({user:req.body.user}).then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

//get Questions by user
app.post('/api/blogspot/getQuestionByUser',(req,res)=>{
    Question.find({user:req.body.user}).then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

//add blog
app.post('/api/blogspot/addBlogComment',(req,res)=>{
    let blogComment=new BlogComment(req.body);
    blogComment.save().then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
});
//get Comment by blog
app.post('/api/blogspot/getCommentByBlog',(req,res)=>{
    BlogComment.find().then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
});
//get Comments
app.get('/api/blogspot/getAllComment',(req,res)=>{
    BlogComment.find().then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

//add Answer
app.post('/api/blogspot/addAnswer',(req,res)=>{
    let answer=new Answer(req.body);
    answer.save().then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    });
});
//get Answer By Question
app.post('/api/blogspot/getAnswerByQuestion',(req,res)=>{
    Answer.find({question:req.body.question}).then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

//get All Answer
app.get('/api/blogspot/getAllAnswers',(req,res)=>{
    Answer.find().then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

// get Answer of User
app.post('/api/blogspot/getAnswerByUser',(req,res)=>{
    Answer.find({user:req.body.user}).then((result)=>{
        if(result){
            res.send(result);
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
});


db.on('error',()=>{
    console.log('There is an error in connecting with database..');
});
db.once('open',()=>{
    console.log('Successfully connected to database.');
});
app.listen(3002,()=>{
    console.log('server is started');
});