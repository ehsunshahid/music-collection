const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
// const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080;
const db = require('./db');
const accountRoutes = require('./routes/account.route');
const playlistRoutes = require('./routes/playlist.route');
const songRoutes = require('./routes/song.route');
const userRoutes = require('./routes/user.routes');
const authenticateService = require('./middlewares/auth');
const playlistService = require('./services/playlist.service');
const songService = require('./services/song.service');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ saveUninitialized: false, resave: false, secret: "some-random-text" }));
// app.use(cookieParser());
app.engine('hbs', expressHandlebars({ defaultLayout: 'main.hbs', }));


// UI Routes
app.get('/', async (req, res) => {
  console.log('req.session.accountId: ', req.session.accountId);
  const publicPlaylists = await playlistService.getAllPublicPlaylists();
  res.render("home.hbs", { publicPlaylists }); 
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
app.get('/login', (req, res) => {
  res.render('login.hbs');
})
app.get('/playlists-page', async (req, res) => {
  if (req.session.accountId) {
    const playlists = await playlistService.getPlaylistsByAccountId(req.session.accountId);
    res.render('playlists.hbs', { playlists });
  } else {
    res.render('login.hbs');
  }
  
});
app.get('/songs-page/:playlistId', async (req, res) => {
  const playlistId = req.params.playlistId;
  const songs = await songService.getSongsByPlaylistId(playlistId);
  res.render('songs.hbs', { songs });
})
app.get('/songs-page-public/:playlistId', async (req, res) => {
  const playlistId = req.params.playlistId;
  const songs = await songService.getSongsByPlaylistId(playlistId);
  res.render('songs-public.hbs', { songs });
})

// Api routes
// app.post('/register', );
app.get('/tokens', (req, res) => {

})

app.use('/', userRoutes);
app.use('/accounts', authenticateService.authenticateAccount, accountRoutes);
app.use('/playlists', playlistRoutes);
app.use('/songs', songRoutes);
app.listen(PORT);

console.log(`App is running at localhost:${PORT}`);

