const mongoose = require('mongoose')

const Schema = mongoose.Schema

const songSchema = new Schema({
    songName:{
        type:String,
        required:true
    },
    film:{
        type:String,
        required:true
    },musicDirector:{
        type:String,
        required:true
    },singer:{
        type:String,
        required:true
    },actor:{
        type:String,
    },actress:{
        type:String,
    },
})

const Song  = mongoose.model('Song',songSchema);

module.exports = Song;