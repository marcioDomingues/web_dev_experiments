var com = com || {};
com.apress = com.apress || {};
com.apress.collection = com.apress.collection || {};

/*
The collection will deal with connection to the server, 
retrieving a list of tweets, 
each of which will be represented by a Tweet object.
*/
//we will conect to the port define in server.js which is 4040
com.apress.collection.Timeline = Backbone.Collection.extend({

    //the model that this collection uses
    model: com.apress.model.Tweet,
    //the server side url to connect to for the collection
    url: 'http://localhost:4040/timeline',
    
    initialize: function(options){
        //anything to be defined on construction goes here
    },

});