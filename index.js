const express = require('express')
const cors = require('cors')

const { port } = require('./configs/config')

const homeRouter = require('./routers/homeRouter')
const singerRouter = require('./routers/singerRouter')
const albumRouter = require('./routers/albumRouter')
const songRouter = require('./routers/songRouter')
const userRouter = require('./routers/userRouter')
const playlistRouter = require('./routers/playlistRouter')
const playlistsongRouter = require('./routers/playlistsongRouter')
const authRouter = require('./routers/authRouter')

const app = express()   
app.use(cors());
app.use(express.json())

app.use('/home', homeRouter)
app.use('/auth', authRouter)
app.use('/singer', singerRouter)
app.use('/album', albumRouter)
app.use('/song', songRouter)
app.use('/user', userRouter)
app.use('/playlist', playlistRouter)
app.use('/playlistsong', playlistsongRouter)



app.listen(port, () => console.log(`App listening on http://localhost:${port} !`));


