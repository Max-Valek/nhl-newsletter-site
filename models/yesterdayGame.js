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

const yesterdayGameSchema = new Schema({
    team1: {
        team: {
            type: String,
            required: true
        },
        record: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: true
        },
        score: {
            type: String,
            required: false
        },
        periods: {
            type: Array,
            required: true
        }
    },
    team2: {
        team: {
            type: String,
            required: true
        },
        record: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: true
        },
        score: {
            type: String,
            required: false
        },
        periods: {
            type: Array,
            required: true
        }
    },
    status: {
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
const YesterdayGame = mongoose.model('yesterday_game', yesterdayGameSchema);

// export the model so we can use it elsewhere in the project
module.exports = YesterdayGame;