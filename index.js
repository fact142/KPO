const express = require('express');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');

const { port } = require('./configs/config');
const sessionConfig = require('./configs/sessionConfig');

const singerRouter = require('./routers/singerRouter');
const authRoutes = require('./routers/authRouter')
const homeRoutes = require('./routers/homeRouter')
const addRoutes = require('./routers/addRouter')
const playlistsRoutes = require('./routers/playlistsRouter')
const accountsRoutes = require('./routers/accountRouter')
const albumRouter = require('./routers/albumRouter')
const songRouter = require('./routers/songRouter')
const userRouter = require('./routers/userRouter')
const playlistRouter = require('./routers/playlistRouter')

const app = express();
app.use(express.json());

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use('/', homeRoutes)
app.use('/singer', singerRouter)
app.use('/album', albumRouter)
app.use('/song', songRouter)
app.use('/user', userRouter)
app.use('/playlist', playlistRouter)

app.use('/auth', authRoutes)
app.use('/playlists', playlistsRoutes)
app.use('/add', addRoutes)
app.use('/account', accountsRoutes)

app.listen(port, () => console.log(`App listening on http://localhost:${port} !`));


