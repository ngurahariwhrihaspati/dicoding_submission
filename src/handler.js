/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
/* eslint-disable no-else-return */
/* eslint-disable no-const-assign */
/* eslint-disable no-shadow */
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */

const { nanoid } = require("nanoid");
const books = require('./books');

/* eslint-disable no-unused-vars */
const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    if (!name) {
      const response = h.response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      });
      response.code(400);
      return response;
    }
    
    if (readPage > pageCount) {
      const response = h.response({
        status: "fail",
        message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(400);
      return response;
    }

    const newBook = {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        id,
        insertedAt,
        updatedAt,
        finished,
    };
    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    
    if (isSuccess) {
      const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
      });
        response.code(201);
        return response;
    }

    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

// const lenBooks = books.filter((book) => book.length > 0);
const viewBook = (request, h) => {
  const mapBook = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = h.response({
  status: 'success',
  data: mapBook,
});
response.code(200);
return response;

  // if(lenBooks) {
  //   const response = h.response({
  //     status: 'success',
  //     data: {
  //       books,
  //     },
  //   });
  //   response.code(200);
  //   return response;
  // },
};

const getBook = (request, h) => {
    const {id} = request.params;

    const book = books.filter((n) => n.id === id)[0];

    if (book !== undefined) {
      return {
        status: 'success',
        data: {
          book,
        },
      };
    }

    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBook = (request, h) => {
  const {id} = request.params;
  const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);
  // const NameB = books.filter((book) => book.name === name).length > 0;

  if (index !== -1) {

    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }
    
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  response.code(200);
  return response;
}

  const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBook = (request, h) => {
  const {id} = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
 addBookHandler, viewBook, getBook, editBook, deleteBook
};