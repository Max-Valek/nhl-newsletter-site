const mongoose = require('mongoose');
// define the structure of the documents that we will
// later store in a collection
const Schema = mongoose.Schema;

/*
const yesterdayGameSchema = new Schema({
    team1: {
        team: ""
        record: ""
        logo: ""
        score: ""
    },
    team2: {
        team: ""
        record: ""
        logo: ""
        score: ""
    }
*/

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true });

// model that uses gameSchema

// first arg - name of model (important): looks at the name, pluralizes it,
// and look for that collection inside the database whenever we use this model
// to communicate w/ the db

// second arg - schema to use (gameSchema we just created)
const User = mongoose.model('user', userSchema);

// export the model so we can use it elsewhere in the project
module.exports = User;