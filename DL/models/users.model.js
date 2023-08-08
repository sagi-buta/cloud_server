const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        token: {
            type: String,
            //required: true,
            default: null
        },
    }
)

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;