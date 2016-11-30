var mongoose = require('mongoose');
var Book = require('../models/book');


function getBooks(req, res) {
    var query = Book.find({});
    query.exec((err, books) => {
        if (err) res.send(err);
        res.json(books);
    });
}


function postBook(req, res) {

    var newBook = new Book(req.body);

    newBook.save((err, book) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: "Book successfully added!", book });
        }
    });
}


function getBook(req, res) {
    Book.findById(req.params.id, (err, book) => {
        if (err) res.send(err);
        res.json(book);
    });
}


function deleteBook(req, res) {
    Book.remove({ _id: req.params.id }, (err, result) => {
        res.json({ message: "Book successfully devared!", result });
    });
}


function updateBook(req, res) {
    Book.findById({ _id: req.params.id }, (err, book) => {
        if (err) res.send(err);
        Object.assign(book, req.body).save((err, book) => {
            if (err) res.send(err);
            res.json({ message: 'Book updated!', book });
        });
    });
}


function setup(req, res) {
    //var newBook = new Book(req.body);
    var books = [
        {
            title: 'Poema de Gilgamesh',
            author: 'Anónimo',
            year: '-600',
            pages: '1000'
        },
        {
            title: 'Las mil y una noche',
            author: 'Anónimo',
            year: '700',
            pages: '1587'
        },
        {
            title: 'Saga de Njál',
            author: 'Anónimo',
            year: '700',
            pages: '789'
        },
        {
            title: 'Todo se desmorona',
            author: 'Chinua Achebe',
            year: '1958',
            pages: '968'
        },
        {
            title: 'Divina comedia',
            author: 'Dante Alighieri',
            year: '1265',
            pages: '1878'
        }
    ];


    for (var i = 0; i < books.length; i++) {
        new Book(books[i]).save(function (err) {
            if (err) throw err;
            console.log('Book  saved successfully')
        });
    }

    res.json({ success: true });

}

module.exports = { getBooks, postBook, getBook, deleteBook, updateBook, setup };