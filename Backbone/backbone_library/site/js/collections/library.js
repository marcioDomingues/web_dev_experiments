// site/js/collections/library.js

var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Book,
    //setting collection.url to be the URL of the API endpoint
    url: '/api/books'
    //NOTE:
    // This results in the default implementation of Backbone.sync, assuming that the API looks like this:
    // url             HTTP Method  Operation
    // /api/books      GET
    // /api/books/:id  GET
    // /api/books      POST
    // /api/books/:id  PUT
    // /api/books/:id  DELETE
    // Get an array of all books
    // Get the book with id of :id
    // Add new book, return book with id attribute added
    // Update the book with id of :id
    // Delete the book with id of :id
});