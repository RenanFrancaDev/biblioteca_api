function routes(app) {
    app.use('/book', require('./routes/book.js'));
    return;
}

module.exports = routes;