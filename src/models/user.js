const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: 'It is required'
        },
        password: {
            type: String,
            required: 'It is required'
        }

    }
)

const SchemaUser = mongoose.models.User || mongoose.model('User', schema);
module.exports = SchemaUser;