var stats = (function(){
    
        var peopleCount = 0;
        
        //cache the dom
        //$el just so i know is storing jquery stuff 
        var $el = $('#statsModule');
        
        var template = $el.find('#stats-template').html();
        
        //using a publish subscrition pattern  
        //SUBSCRIBER
        pubsub.subscribe('peopleChanged', setPeople);

        _render();

        //render
        function _render(){
            //mustache usage -> takes a template and a object and find
            //  the template value and loks for it in the object
            //ex -> Mustache.render('hello {{name}}',{name: "will"});
            $el.html( Mustache.render( template , {people: peopleCount} ) );
        }

        //////////////////////////////////////////////////////////////////////
        ///exposed functions
        ///
         function setPeople( newPeople ){
            peopleCount = newPeople;
            _render();
            
         }

         function destroy(){
            $stats.remove();
            events.off('peopleChanged', setPeople);
         }
         
})();