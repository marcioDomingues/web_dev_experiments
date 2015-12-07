
var people = (function(){
    
        var people = ['will', 'me', 'another'];
        
        //cache the dom
        //$el just so i know is storing jquery stuff 
        var $el = $('#peopleModule');
        var $button = $el.find('button');
        var $input = $el.find('input');
        var $ul = $el.find('ul');
            
        var template = $el.find('#people-template').html();
                
        //bind events
        $button.on('click', addPerson );
        $ul.delegate('i.del', 'click', deletePerson );
        
        _render();

        //render
        function _render(){
            //mustache usage -> takes a template and a object and find
            //  the template value and loks for it in the object
            //ex -> Mustache.render('hello {{name}}',{name: "will"});
            $ul.html( Mustache.render( template , {people: people} ) );
            //this calls stas directly
            //stats.setPeople(people.length);
            //NOW
            //using a publish subscrition pattern
            //we will send the array and the reciver will 
            //do the count or whatever  
            //PUBLISH
            pubsub.publish( "peopleChange", people );

        }

        //////////////////////////////////////////////////////////////////////
        ///exposed functions
        ///
         function addPerson( value ){
            //have to do this so it distinguish from the event (object) passed
            var name = ( typeof value === "string" ) ? value : $input.val() ;
            people.push(name);
             //render array
            _render();
             //clear value 
            $input.val('');
         }

         function deletePerson(event){
            var i;
            if (typeof event === "number") {
                i = event;
            } else{
                //find the target clicked, the correspondent name 
                var $remove = $(event.target).closest('li');
                //find index of the li to remove
                var i = $ul.find('li').index($remove);
                //remove the index from people array
                
            }
            people.splice( i, 1);
            _render();
         }

         //exposed function
         return{
            addPerson: addPerson,
            deletePerson: deletePerson,
         };
         
})();
