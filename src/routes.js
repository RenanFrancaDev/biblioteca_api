function routes(app) {
    app.use('/book', require('./routes/book.js'));
    app.use('/user', require('./routes/user.js'));
    return;
}

module.exports = routes;