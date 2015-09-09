// site/js/app.js

var app = app || {};

//early use to feed the collection of itens
//to be replaced with remote api
// $(function() {
//     var books = [
//         { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', releaseDate: '2008', keywords: 'JavaScript Programming' },
//         { title: 'The Little Book on CoffeeScript', author: 'Alex MacCaw', releaseDate: '2012', keywords: 'CoffeeScript Programming' },
//         { title: 'Scala for the Impatient', author: 'Cay S. Horstmann', releaseDate: '2012', keywords: 'Scala Programming' },
//         { title: 'American Psycho', author: 'Bret Easton Ellis', releaseDate: '1991', keywords: 'Novel Splatter' },
//         { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', releaseDate: '2011', keywords: 'JavaScript Programming' }
//     ];

//     new app.LibraryView( books );
// });

//feed by remote api 
$(function() {
    $( '#releaseDate' ).datepicker();
    new app.LibraryView();
});