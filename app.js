const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
const db = require('./db');
const accountRoutes = require('./routes/account.route');
const playlistRoutes = require('./routes/playlist.route');
const songRoutes = require('./routes/song.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.engine('hbs', expressHandlebars({ defaultLayout: 'main.hbs', }));


// UI Routes
app.get('/', (req, res) => {
  res.render("home.hbs"); 
});
app.get('/about', (req, res) => {
  res.render("about.hbs") 
});
app.get('/contact', (req, res) => {
  res.render("contact.hbs") 
});
app.get('/register', (req, res) => {
  res.render("register.hbs") 
});

// Api routes
app.post('/sign-up', (req, res) => {
  
});

app.use('/accounts', accountRoutes);
app.use('/playlists', playlistRoutes);
app.use('/songs', songRoutes);
app.listen(PORT);

console.log(`App is running at localhost:${PORT}`);

