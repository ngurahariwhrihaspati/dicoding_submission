/* eslint-disable eol-last */
/* eslint-disable linebreak-style */

const {
  addBookHandler, viewBook, getBook, editBook, deleteBook,
} = require('./handler');

/* eslint-disable indent */
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: viewBook,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBook,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBook,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBook,
    },
];

module.exports = routes;