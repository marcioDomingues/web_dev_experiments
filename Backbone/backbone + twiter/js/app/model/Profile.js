var com = com || {};
com.apress = com.apress || {};
com.apress.model = com.apress.model || {};

com.apress.model.Profile = Backbone.Model.extend({
    
    urlRoot: 'http://localhost:4040/profile',
    
    parse: function(model){
        return model;
    }
});