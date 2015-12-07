//https://www.youtube.com/watch?v=pOfwp6VlnlM&index=3&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f
//
//REVEALING MODULE PATTERN
//
//create module wher only some services are available
//for the user 
//
//we dont want to expose metods like render or cacheDom
//only the ones we ofer for usage
//
//so insted of being an object it should be 
//a self executing anonimous function
//NOTE -> if a function gets wrapped in () it gets evaluated
//EXAMPLE -> 1.toString(); doesnt work because its not evaluated, it a number
//             var a = 1; a.toString Works 
//             and
//             (1).toString(); also works because it gets evaluated to a number type
//
//same goes for functions
//  we also create or own scope inside
//  var people = ( function () {
//      var name = 'marcio';  
//      
//      function sayName(){ alert(name); }
//      
//      return{ 
//          sayYourName: sayName 
//          name: "some_Name" //this one can change
//      }
//  }) ()  
//  marcio -> is not acessible outside
//  
//  works like a private variable in java
//  and we can add a return value so from outside it returns the variable
//  
//LETS DO IT

var people = (function(){
    
        var people = ['will', 'me'];
        
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
