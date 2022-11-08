const mongoose = require('mongoose');
// define the structure of the documents that we will
// later store in a collection
const Schema = mongoose.Schema;

/*
const articleSchema = new Schema({
    title: ,
    image: ,
    summary: ,
    author: ,
    timestamp:
*/

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }

}, { timestamps: true });

// model that uses gameSchema

// first arg - name of model (important): looks at the name, pluralizes it,
// and look for that collection inside the database whenever we use this model
// to communicate w/ the db

// second arg - schema to use (gameSchema we just created)
const Article = mongoose.model('article', articleSchema);

// export the model so we can use it elsewhere in the project
module.exports = Article;