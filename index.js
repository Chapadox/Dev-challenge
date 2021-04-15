const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const booksRoute = require('./routes/bookRoutes')


app.use(bodyParser.urlencoded({ extended: false }))
booksRoute(app)
app.listen(port, () => console.log(`Servidor online na porta ${port}`))