const express=require('express');
const app=express();
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const Article = require('./models/dbSchema');
const bodyparser=require('body-parser');
const exhbs=require('express-handlebars');

mongoose.connect('mongodb://127.0.0.1:27017/blog', {
   useNewUrlParser: true,
   useUnifiedTopology: true
 })
 

app.engine("hbs",exhbs.engine({layoutsDir:'views/',defaultLayout:false,
   extname:"hbs",partialsDir:"views/layouts" ,
   runtimeOptions: {
   allowProtoPropertiesByDefault: true,
   allowProtoMethodsByDefault: true}
}));
app.set('view engine','hbs');
app.set('views','views');

app.use(bodyparser.urlencoded({extended:true}))

app.get('/', async(req,res)=>{
   const articles = await Article.find().sort({ createdAt: 'desc' });
   res.render('index',{articles:articles});
  
})

app.use('/articles',articleRouter);
app.listen(8000,()=>
{
   console.log("listing!..")
});