
var com = com || {};
com.apress = com.apress || {};
com.apress.model = com.apress.model || {};

com.apress.model.Search = Backbone.Model.extend({

    url     : 'http://localhost:4040/search',
    rootUrl : 'http://localhost:4040/search',


    sync: function(method, model, options){
        if(this.get('query')){
            this.url = this.rootUrl + '/' + this.get('query');
        }
        Backbone.sync.call(this, method, model, options);

    },

    
    parse: function(model){
    
        return model;
    }

});