const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fantasySchema = new Schema({
    player: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    headshot: {
        type: String,
        required: false
    },
    fpoints: {
        type: String,
        required: false
    },
    goals: {
        type: String,
        required: false
    },
    assists: {
        type: String,
        required: false
    },
    ppp: {
        type: String,
        required: false
    },
    shp: {
        type: String,
        required: false
    },
    shots: {
        type: String,
        required: false
    },
    hits: {
        type: String,
        required: false
    },
    blocks: {
        type: String,
        required: false
    },
    wins: {
        type: String,
        required: false
    },
    ga: {
        type: String,
        required: false
    },
    saves: {
        type: String,
        required: false
    },
    so: {
        type: String,
        required: false
    },
    otl: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    }

}, { timestamps: true });


const Fantasy = mongoose.model('fantasy_leader', fantasySchema);


module.exports = Fantasy;