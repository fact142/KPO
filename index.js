const express = require('express');
const singerRouter = require('./routers/singerRouter')
const { port } = require('./config');

const app = express();
app.use(express.json());

app.use('/singer', singerRouter);

app.listen(port, () => console.log(`App listening on http://localhost:${port} !`));