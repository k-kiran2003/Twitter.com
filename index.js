const express = require("express");
let app = express();
let port = 3000;
//PATH
let path = require("path");
//FOR UNIQUE ID'S
const { v4: uuidv4 } = require('uuid');

// //OVERRIDE REQUEST
let methodOverride = require('method-override')
app.use(methodOverride('_method'));

//POST REQUEST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//EJS
app.set("view engine", "ejs");
//STATIC FILES
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
//DATA
let posts = [
    {
        id : uuidv4(),
        username :"@__ikiran",
        tweet : "keep learning keep coding !!"
    },
    {
        id : uuidv4(),
        username :" @beauty",
        tweet :"everyone has beauty but not everyone can sees it"

    },{
        id : uuidv4(),
        username: "@healty_you",
        tweet : "an apple a day keeps the doctor away"
    }
];
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

//GET DATA
app.get("/posts",(req,res)=>{
res.render("index.ejs",{posts});
});

// to create NEW TWEET
app.get("/posts/new",(req,res)=>{
res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username,tweet} = req.body;
    let id = uuidv4();
    posts.push({id,username,tweet});
    res.redirect("/posts");
});
//VIEW POST
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let data = posts.find((p)=> id === p.id);
    if(data){
        console.log("found");
        res.render("show.ejs",{data});
        console.log({data});
    }
    else{res.send("page not found ");

        console.log('data not found');
    };
});
//edit post
app.get("/posts/:id/edit",(req,res)=>{
let {id} = req.params;
    let data = posts.find((p) => id === p.id);

    res.render("edit.ejs",{data});
});
//MAKING CHANGES
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let tweet = req.body.tweet;
    let data = posts.find((p) => id === p.id);
   data.tweet = tweet;
   res.redirect("/posts");
});
//DELETE
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");

});

