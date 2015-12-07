$(function (){

    var $orders = $('#orders');

    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/johnbob/friends',
        success: function( orders ) {
            //console.log("I have friends!",orders); //returns all of johnbob's friends
            $.each( orders , function ( i, order ){

                $orders.append( '<li>name: ' + order.name + ', drink: ' + order.drink + '</li>')
                
            });
        },
        error: function() {
            alert ('error loading orders');
        }
    }); 




});




