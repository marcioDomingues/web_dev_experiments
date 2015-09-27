'use strict';

$(function() {

    //settings for slider
    var width = 720;
    var animationSpeed = 500;
    var pause = 2000;
    var currentSlide = 1;

    //cache DOM elements
    var $slider = $('#slider');
    var $slideContainer = $slider.find('.slides');
    var $slides = $slideContainer.find('.slide');

    var interval;

    function startSlider() 
    {
        interval = setInterval(function() 
        {
            $slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function() 
            {
                currentSlide++;
                if (currentSlide === $slides.length) 
                {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                }
            });
        }, 2000);
    }

    function pauseSlider() {
        clearInterval(interval);
    }

    //
    $slider
        .on('mouseenter', pauseSlider)
        .on('mouseleave', startSlider);

    //startSlider();
    //alert($slides.length);
});