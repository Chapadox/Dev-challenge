const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '../Banco/BancoDeDados.json')

function getUsers () {
    const data  = fs.readFileSync(file)

    try {
        return JSON.parse(data)
    } catch (err) {
        return []
    }
}

const books = app => {
    app.route('/books')
        .get((req, res) => {
            res.send(getUsers())
        })
}

module.exports = books