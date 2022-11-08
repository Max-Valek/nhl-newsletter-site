const mongoose = require('mongoose');


const Schema = mongoose.Schema;

/*
each division has 8 teams


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

const standingsSchema = new Schema({
    team: {
        name: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: true
        },
        conference: {
            type: String,
            required: true
        },
        division: {
            type: String,
            required: true
        }
    },
    stats: {
        gp: {
            type: String,
            required: true
        },
        wins: {
            type: String,
            required: true
        },
        losses: {
            type: String,
            required: true
        },
        otl: {
            type: String,
            required: true
        },
        points: {
            type: String,
            required: true
        },
        reg_w: {
            type: String,
            required: true
        },
        reg_ot_w: {
            type: String,
            required: true
        },
        sow: {
            type: String,
            required: true
        },
        sol: {
            type: String,
            required: true
        },
        home: {
            type: String,
            required: true
        },
        away: {
            type: String,
            required: true
        },
        gf: {
            type: String,
            required: true
        },
        ga: {
            type: String,
            required: true
        },
        diff: {
            type: String,
            required: true
        },
        l10: {
            type: String,
            required: true
        },
        streak: {
            type: String,
            required: true
        }
    },
    date: {
        type: String,
        required: true
    }

}, { timestamps: true });


const Standings = mongoose.model('standing', standingsSchema);


module.exports = Standings;