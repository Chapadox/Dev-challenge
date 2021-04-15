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
    app.route('/books/:id?')
        .get((req, res) => {
            res.send(getBooks())
        })

        .post((req, res) => {
            const books = getBooks()

            books.map(item => {
                if (item.id === req.body.id) {
                    req.body.id++
                    return req.body
                }
            })

            books.push(req.body)
            postBooks(books)

            res.status(200).send('Seu livro foi adicionado.')
        })

        .put((req, res) => {
            const books = getBooks()

            postBooks(books.map(book => {
                if (book.id === req.params.id) {
                    return {
                        ...book,
                        ...req.body
                    }
                }
                return book
            }))
            res.status(201).send('Livro atualizado')
        })

        .delete((req, res) => {
            const books = getBooks()

            postBooks(books.filter(book => book.id !== Number(req.params.id)))
            res.status(200).send('Livro deletado')
        }) 
}

module.exports = books