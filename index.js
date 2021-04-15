const express = require('express')
const app = express()
const port = 3000
const booksRoute = require('./routes/bookRoutes')

booksRoute(app)
app.listen(port, () => console.log(`Servidor online na porta ${port}`))