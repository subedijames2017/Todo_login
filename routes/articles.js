const express = require('express');
const router =express.Router();
const Article = require('../models/article');
//add post
router.get("/add",function(req,res){
  res.render('add');
});
router.post("/add",function(req,res){
  const article = new Article();
  article.title=req.body.title;
  article.body=req.body.body;
  article.author=req.body.author;
  article.save(function(err){
    if(err){
      console.log(err);
    }
    else {

      req.flash('success_msg', 'You successfully added');

      res.redirect('/');
    }

  })
  console.log("you are successfully submitted");
});

router.get('/edit/:id',function(req,res){
  Article.findById(req.params.id).then(function(article,err){
      if(err)
      {
        console.log(err);
      }
      else {
          res.render('edit_article',{
            title:"edit",
            article:article
          });
      };
    });
  });
  router.post("/edit/:id",function(req,res){
    let article = {};
    article.title=req.body.title;
    article.body=req.body.body;
    article.author=req.body.author;
    let query = {_id:req.params.id}
    Article.update(query,article,function(err){
      if(err){
        console.log(err);
      }
      else {
        req.flash('success_msg', 'You successfully edited');

    		res.redirect('/');
      }

    })
    console.log("you have successfully edited");
  });
  //get single articles
  router.get('/:id',function(req,res){
    Article.findById(req.params.id).then(function(article,err){
        if(err)
        {
          console.log(err);
        }
        else {
            res.render('article',{
              title:"Acepirit",
              article:article
            });
        };
      });
    });
  //delete the article
  router.delete('/:id',function(req,res){
      let query={_id:req.params.id}
      Article.remove(query,function(err){
      if (err) {
        console.log(err);

      };
        res.send('Success');

      });
    });

module.exports=router;
