const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/user');


app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname,'public')));


app.get('/', (req,res) => {
    res.render('index');
});
app.get('/delete/:id', async(req,res) => { 
    let users1 = await userModel.findOneAndDelete({_id: req.params.id});   //id ko delte karna heya upper balle id ko 
     res.redirect('/read');
 });

app.get('/read', async(req,res) => {
   let users1 = await userModel.find()
    res.render('read',{users: users1});
});
app.post('/create', async (req,res) => {
    let {name, email, image} = req.body;
   let usercreate =  await  userModel.create({
        name: name,
        email: email,
        image
    })
    res.redirect("/read");
})


app.listen(4001);


