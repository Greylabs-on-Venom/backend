const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    login: {
        type: String,
    },
    twitterProfile: {
        type: Object,
        required: true,
    },
    discordProfile: {
        type: Object,
        required: true,
    },
    venomAddress: {
        type: String,
        required: true,
    },
    roles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    

});


module.exports = mongoose.model('Users', UserSchema);