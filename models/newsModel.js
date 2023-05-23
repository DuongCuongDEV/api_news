const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema ({
    theLoai: {
        type: String
    },
    noiDung: {
        type: String,
        
    },
    tieuDe: {
        type: String,
        required: true
    },
    uri:{
        type: String
    }
});

const newsModel = new mongoose.model('news',newsSchema );

module.exports = newsModel;



