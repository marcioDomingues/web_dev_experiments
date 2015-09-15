// I found a useful piece of JavaScript code that provides a regular expression 
// for replacing @username parts with links on Simon Whatley’s blog 
//     (www.simonwhatley.co.uk/parsing-twitter-usernames-hashtags-and-urls-with-javascript).
// Note that once the string is parsed, it needs to be returned as a SafeString. 
// Any time that you add a helper that creates its own HTML, you will probably want 
// to use this type because it will escape the HTML code and make it appear as expected.

// $(function() {
//     Handlebars.registerHelper('format', function (str) {
//         if(str){
//             //highlight the @part
//             //Thanks
//             str = str.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
//                  var username = u.replace("@","");
//                  return '<a href="#" data-user="' + username +'"class="profile">@'+username+'</a>';
//             });
//             return new Handlebars.SafeString(str);
//         }else{
//             return str;
//         }
//     });
// });

 $(function() {

    Handlebars.registerHelper('format', function (str) {
        if(str){
            
            //highlight the @part  
            //Thanks to http://www.simonwhatley.co.uk/parsing-twitter-usernames-hashtags-and-urls-with-javascript
            str = str.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
                        var username = u.replace('@','');
                       // return u.link("http://twitter.com/"+username);
                       return '<a href="#" data-user="' + username +'" class="profile">@'+username+'</a>';
            });


           
           return new Handlebars.SafeString(str);
        }else{
            return str;
        }
        
    });

});