const express = require('express');
const articleRouter = require("./routes/articles");
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster1.nqvqztn.mongodb.net/?retryWrites=true&w=majority', {

}).then(() => {
    console.log("Connection to MongoDB successful");
}).catch((err) => {
    console.error("Connection to MongoDB failed:", err);
    process.exit(1); // Exit the process if connection fails
});

app.set("views", "./view");
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', async(req, res) => {
    const articles = await Article.find().sort({ createdAt:'desc'});
    res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

app.listen(5454, () => {
    console.log("Server is running on port 5454");
});
