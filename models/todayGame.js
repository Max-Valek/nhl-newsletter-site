const mongoose = require('mongoose');
// define the structure of the documents that we will
// later store in a collection
const Schema = mongoose.Schema;

/*
const todayGameSchema = new Schema({
    time: "",
    date: "",
    network: "",
    team1: {
        team: "",
        record: "",
        logo: "",
        moneyline: "",
        puckline: "",
        puckline_odds: "",
    },
    team2: {
        team: "",
        record: "",
        logo: "",
        moneyline: "",
        puckline: "",
        puckline_odds: "",
    },
    ou: {
        o: "",
        o_odds: "",
        u: "",
        u_odds: "",
    }
}
*/

const todayGameSchema = new Schema({
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    network: {
        type: String,
        required: true
    },
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
        moneyline: {
            type: String,
            required: false
        },
        puckline: {
            type: String,
            required: false
        },
        puckline_odds: {
            type: String,
            required: false
        },
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
        moneyline: {
            type: String,
            required: false
        },
        puckline: {
            type: String,
            required: false
        },
        puckline_odds: {
            type: String,
            required: false
        },
    },
    ou: {
        o: {
            type: String,
            required: false
        },
        o_odds: {
            type: String,
            required: false
        },
        u: {
            type: String,
            required: false
        },
        u_odds: {
            type: String,
            required: false
        }
    }

}, { timestamps: true });

// model that uses gameSchema

// first arg - name of model (important): looks at the name, pluralizes it,
// and look for that collection inside the database whenever we use this model
// to communicate w/ the db

// second arg - schema to use (gameSchema we just created)
const TodayGame = mongoose.model('today_game', todayGameSchema);

// export the model so we can use it elsewhere in the project
module.exports = TodayGame;