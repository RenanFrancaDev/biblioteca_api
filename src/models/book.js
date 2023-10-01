const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: 'It is required',
        },
        synopsis: {
            type: String,
            default: null,
        },
        paginas: {
            type: Number,
            required: 'It is required',
        },
        isbn: {
            type: String,
            required: 'It is required',
        },
        editora: {
            type: String,
            required: 'It is required',
        },
        img :{
            type: String,
            default: null,
        }
    },
    {
        timestamps: true
    }
);

const SchemaBook = mongoose.models.Book || mongoose.model('Book', schema);
module.exports = SchemaBook;