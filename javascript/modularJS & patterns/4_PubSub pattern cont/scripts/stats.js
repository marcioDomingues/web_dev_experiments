var stats = (function(){
    
        var peopleCount = 0;
        
        //cache the dom
        //$el just so i know is storing jquery stuff 
        var $stats = $('#statsModule');
        var template = $stats.find('#stats-template').html();
     
        //bind events
        //register for the event
        events.on('peopleChanged', setPeople);


        _render();

        //render
        function _render(){
            //mustache usage -> takes a template and a object and find
            //  the template value and loks for it in the object
            //ex -> Mustache.render('hello {{name}}',{name: "will"});
            $stats.html( Mustache.render( template , {people: peopleCount} ) );
        }

        //////////////////////////////////////////////////////////////////////
        ///exposed functions
        ///
         function setPeople( newPeople ){
            peopleCount = newPeople;
            _render();
            
         }

         function destroy () {
            $stats.remove();
            events.off('peopleChanged', setPeople);
         }

         //this api removes the event listener
         return {
            destroy: destroy,
         };
         //binding to a pubsub we dont need to expose an api
         //for the setPeople
         // return{
         //    setPeople: setPeople,
         // };
})();