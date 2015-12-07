$(function (){
    //cache the DOM
    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');

    //mustache template
    //not best solution we can do this in a html file
    /*var orderTemplate = "" +
    "<li>"+
    "<p><strong>name: </strong>{{name}}</p>"+
    "<p><strong>drink:</strong> {{drink}}</p>"+
    "<button data-id='{{id}}' class='remove'>X</button>"+
    "</li>";
    */
     //same using template tag
     var orderTemplate = $('#order-template').html();

     function addOrder(order){
        $orders.append( Mustache.render(orderTemplate, order) );
    }


    //Get listing from server
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/johnbob/friends',
        success: function(orders) {
            //console.log("I have friends!", orders); //returns all of johnbob's friends
            $.each( orders , function ( i, order ){
                //console.log("BANG!");
                addOrder(order);
            });
        },
        error: function() {
            alert('error loading orders');
        }
    }); 


    $('#add-order').on('click',function(){

        var order = {
            name: $name.val(),
            drink: $drink.val(),
        };

        $.ajax({
            type: 'POST',
            url: 'http://rest.learncode.academy/api/johnbob/friends',
            data: order,
            success: function(newOrder) {
                //console.log("Friend added!", newOrder); //the new item is returned with an ID
                addOrder(newOrder);
            },
            error: function() {
                alert('error saving order');
            }

        }); 


    });

    //Because .remove class does not exist yet so insted
    //of using on() and listen to clicks on .remove 
    //we listen to the parent orders (already cached) and delegate
    $orders.delegate('.remove','click',function(){

        var $li = $(this).closest('li');

        $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/johnbob/friends/' + $(this).attr('data-id'),
            success: function(newOrder) {
                $li.fadeOut( 300, function (){
                    $(this).remove();
                });
            },
            error: function() {
                alert('error deleting order');
            }
        }); 


    });

    //edit operations EDIT MODE
    //when edit is pressed we display the input boxes
    $orders.delegate('.editOrder','click',function(){

        var $li = $(this).closest('li');
        //setting the input to same value as span 
        $li.find('input.name').val( $li.find('span.name').html() ); 
        $li.find('input.drink').val( $li.find('span.drink').html() ); 
        $li.addClass('edit');
    });

    //edit operations CANCEL
    //when cancel is pressed we turn of edit mode
    $orders.delegate('.cancelEdit','click',function(){
        $(this).closest('li').removeClass('edit');
    });


    //edit operations SAVE
    //when Save is pressed we send content changes of input 
    //boxes to the server
    $orders.delegate('.saveEdit','click',function(){
        var $li = $(this).closest('li');

        var order = {
            name: $li.find('input.name').val(),
            drink: $li.find('input.drink').val(),
        };
        
        $.ajax({
            type: 'PUT',
            url: 'http://rest.learncode.academy/api/johnbob/friends/' + $li.attr('data-id'),
            data: order,
            success: function( Order ) {
                
                $li.find('span.name').html( order.name ); 
                $li.find('span.drink').html( order.drink ); 
                $li.removeClass('edit');
            },
            error: function() {
                alert('error updating order');
            }

        }); 

    });

});




