const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '../Banco/BancoDeDados.json')

function getBooks() {
    const data = fs.readFileSync(file)

    try {
        return JSON.parse(data)
    } catch (err) {
        return []
    }
}


function postBooks(books) {
    fs.writeFileSync(file, JSON.stringify(books, null, '\t'))
}

const books = app => {
    app.route('/books')
        .get((req, res) => {
            res.send(getBooks())
        })

        .post((req, res) => {
            const books = getBooks()

            books.map(item => {
                if(item.id === req.body.id) {
                    req.body.id++
                    return req.body
                }
            })
            books.push(req.body)
            postBooks(books)
            res.status(200).send('a')
        })
}

module.exports = books