    
    $('.nav-side .nav-toggle').on('click',function(e) {
        e.preventDefault();
        //add and removes another class name
        $(this).parent().toggleClass('nav-open');

    });

