const express = require('express')
const app = express();
const mongoose = require('mongoose')

const Song = require('./musicModel/musicModel');

app.set('view engine','ejs')

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

mongoose.connect('mongodb://localhost:27017')
    .then(()=>{
        app.listen(4545,()=>{
            console.log('Connected to db and listening on 4545')
        })
    })
    .catch((err)=>{
        console.log(err);
    })

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/addsong',(req,res)=>{
    const {songName,film,musicDirector,singer, actor, actress} = req.body;

    const newSong = new Song({songName,film,musicDirector,singer,    actor,
        actress});

    newSong.save()
        .then((result)=>{
            res.redirect('/songs')
        })
        .catch((err)=>{
            res.status(404).send("Error is adding  data in db")
        })
})

app.get('/songs',(req,res)=>{
    Song.find()
        .then((songs)=>{
            res.render('table',{songs})
        })
        .catch((err)=>{
            res.status(404).send("Error is retriveing  data from db")
        })
})

app.post('/delete/:id',(req,res)=>{
    const id = req.params.id;

    Song.findByIdAndDelete({_id:id})
    .then((result)=>{
        res.redirect('/songs')
    })
    .catch((err)=>{
        res.send("Enable to delete")
    })
})



app.get('/getmusicDirector/:name',(req,res)=>{

    const name = req.params.name;

    Song.find({musicDirector:name})
    .then((songs)=>{
        res.render('table',{songs})
    })
    .catch(err=>{res.send("err")})

})

app.get('/getmusicDirector/:name1/singer/:name2',(req,res)=>{

    const {name1,name2} = req.params;

    Song.find({musicDirector:name1,singer:name2})
    .then((songs)=>{
        res.render('table',{songs})
    })
    .catch(err=>{res.send("err")})

})

app.get('update/:id/actor/:actor/actress/:actress',(req,res)=>{
    const { id,actor,actress} = req.params;

    Song.updateMany({_id:id},{$set:{actor:actor,actress:actress}})
    .then((result)=>{
        res.redirect('/songs')
    })
})