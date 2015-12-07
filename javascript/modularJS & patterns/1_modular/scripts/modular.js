//https://www.youtube.com/watch?v=m-NYyst_tiY&index=2&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f
(function(){

    var people = {

        people: ['will', 'me'],
        

        init: function(){
            this.cacheDom();
            this.bindEvents();
            this.render();
        },

        cacheDom: function(){
            //$el just so i know is storing jquery stuff 
            this.$el = $('#peopleModule');
            this.$button = this.$el.find('button');
            this.$input = this.$el.find('input');
            this.$ul = this.$el.find('ul');
            
            this.template = this.$el.find('#people-template').html();
        },

        bindEvents: function(){
            //we have to bind the call or else the this context is the event call
            //we want the this to be the person context
            this.$button.on('click', this.addPerson.bind(this));
            this.$ul.delegate('i.del', 'click', this.deletePerson.bind(this));
        },

        render: function(){
            
            var data = {
                people: this.people,
            };
            //mustache usage -> takes a template and a object and find
            //  the template value and loks for it in the object
            //ex -> Mustache.render('hello {{name}}',{name: "will"});
            this.$ul.html(Mustache.render(this.template,data));
        },


        //////////////////////////////////////////////////////////////////////
         addPerson: function(){
             this.people.push(this.$input.val());
             //render array
             this.render();
             //clear value 
             this.$input.val('');
         },

         deletePerson: function(event){
            //console.log('HIT');
            //find the target clicked, the correspondent name 
             var $remove = $(event.target).closest('li');
            //find index of the li to remove
            var i = this.$ul.find('li').index($remove);
            //remove the index from people array
            this.people.splice( i, 1);
            this.render();
         },

    };

    people.init();
    
})();