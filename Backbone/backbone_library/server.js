//////////////////////////////////////////////////////
// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    bodyParser = require('body-parser'), //Parser for reading request body
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//////////////////////////////////////////////////////
//Create server
var app = express();


//////////////////////////////////////////////////////
//database connection 
mongoose.connect( 'mongodb://localhost/library_database' );

//schemas

//mongoose db Keyword schema definition
var Keywords = new mongoose.Schema({ keyword: String
});

//mongoose db Book schema definition
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    //To add a subschema to an existing schema, 
    //we use brackets notation like so
    keywords: [ Keywords ]

});

//Models
var BookModel = mongoose.model( 'Book', Book );




//////////////////////////////////////////////////////
// Configure server
app.configure( function() {
    //parses request body and populates request.body 
    app.use( express.bodyParser() );
 
    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );
 
    //perform route lookup based on URL and HTTP method
    app.use( app.router );
 
    //Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );
 
    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }) );
});


//////////////////////////////////////////////////////
//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode',
    port, app.settings.env );
});




//////////////////////////////////////////////////////
//Setting up the routes for the restfull API
//HTTP verbs get, put, post, and delete, 
//which correspond to create, read, update, and delete, 
//respectively
// url             HTTP Method  Operation
// /api/books      GET          Get an array of all books
// /api/books/:id  GET          Get the book with id of :id
// /api/books      POST         Add a new book and return the book with an id attribute added
// /api/books/:id  PUT          Update the book with id of :id
// /api/books/:id  DELETE       Delete the book with id of :id
//////////////////////////////////////////////////////

// Routes
// main api route
app.get( '/api', function( request, response ) {
    response.send( 'Library API is running' );
});


//////////////////////////////////////////////////////
//http verbs
//GET
//Get list of all books
app.get( '/api/books', function( request, response){
    return BookModel.find( function( err, books ){
        if ( !err ) {
            return response.send( books );
        }else{
            return console.log( err );
        }
    });
});

//GET :id
//Get a single book by id
app.get( '/api/books/:id', function( request, response ) {
    return BookModel.findById( request.params.id, function( err, book ) {
        if( !err ) {
            return response.send( book );
        } else {
            return console.log( err );
        }
    });
});

//POST
//Insert a new book
app.post( '/api/books', function( request, response ) {
    var book = new BookModel({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate,
        //add keywords 
        keywords: request.body.keywords
    });

    book.save( function( err ) {
        if( !err ) {
            return console.log( 'created' );
        } else {
            return console.log( err );
        }
    });
    return response.send( book );
});

//PUT :id
//Update a book
app.put( '/api/books/:id', function( request, response ) {
    console.log( 'Updating book ' + request.body.title );
    return BookModel.findById( request.params.id, function( err, book ) {
        book.title = request.body.title;
        book.author = request.body.author;
        book.releaseDate = request.body.releaseDate;
        //change keywords 
        book.keywords = request.body.keywords;

        return book.save( function( err ) {
            if( !err ) {
                console.log( 'book updated' );
                return response.send( book );
            } else {
                console.log( err );
            }
        });
    });
});

//DELETE :id
//Delete a book
app.delete( '/api/books/:id', function( request, response ) {
    console.log( 'Deleting book with id: ' + request.params.id );
    return BookModel.findById( request.params.id, function( err, book ) {
        return book.remove( function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});

























