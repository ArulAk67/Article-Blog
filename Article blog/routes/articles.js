const mongoose = require('mongoose');
const express = require('express');
const Article = require('./../models/dbSchema');
const router = express.Router();

router.get('/new',(req,res)=>{
 
    res.render('new',{article:new Article});
})
router.get('/edit/:id', async(req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('edit', { article })
})
router.get('/:id',async (req,res)=>{
   
    const article= await Article.findById(req.params.id);
    if(article==null) res.render('/')
    res.render('show',{article})
   
})
router.post('/', async(req,res)=>
{
    let article=new Article({
    title : req.body.title,
    description : req.body.description,
    markdown : req.body.markdown
    });
    try
    {
        article=await article.save();
        res.redirect(`/articles/${article._id}`)
    }catch(e){
        res.render('new',{article});
    }
})

router.post('/delete/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
router.post('/edit/:id' ,async(req,res)=>{
    
       let article= await Article.findByIdAndUpdate(req.params.id,{
        new: true,
        upsert: true 
      });
      
      article.title = req.body.title,
      article.description = req.body.description,
      article.markdown = req.body.markdown
      
        try
        {
            article=await article.save();    
            res.redirect(`/articles/${article._id}`)
        
        }catch(e){
            res.render('new',{article});
        }
})

module.exports = router;
