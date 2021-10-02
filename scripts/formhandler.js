    (function (window) {
        'use strict';
        var App = window.App || {};
        var $ = window.jQuery;
        var SUBMIT_SELECTOR = '[data-submit-payment="pay"]';
        
        
        class FormHandler {
            constructor(selector) {
                if (!selector) { throw new Error('No selector provided'); }

                this.$formElement = $(selector);
                if (this.$formElement.length === 0) { 
                    throw new Error('Could not find element with selector: ' + selector);
                }
            }

            addSubmitHandler(fn) { 
                console.log('Setting submit handler for form');
                this.$formElement.on('submit', function(event) { 
                    event.preventDefault();

                    // var data = $(this).serializeArray();
                    var data = {};
                    $(this).serializeArray().forEach(function(item) { 
                        data[item.name] = item.value;
                        console.log(item.name + ' is ' + item.value);
                    });
                    console.log(data);
                    fn(data)
                        .then(function() {
                            this.reset();
                            this.elements[0].focus();
                        }.bind(this));
                
                });
            }
            addInputHandler(fn) { 
                console.log('Setting input handler for form');
                this.$formElement.on('input', '[name="emailAddress"]', function(event) {
                    var emailAddress = event.target.value;
                    var message = '';
                    // console.log(fn(emailAddress));
                    if (fn(emailAddress)) { 
                        event.target.setCustomValidity('');
                    } else {
                        message = emailAddress + ' is not authorized!';
                        event.target.setCustomValidity(message);
                    }
                });
            }


        }
        
        App.FormHandler = FormHandler;

        window.App = App;
        $( "form" ).submit(function( event ) {
            var username = $('input').text();
            var  title = $('input[name=title]:checked', '#form').val();
            if ( !$(this).val()  ) {
              $( "a" ).text("Thank you for your payment, " + title + " " + username).show();
            }
           else
           {
            $( "a" ).text( "There was an error processing your payment." ).show().fadeOut( 5000 );
            event.preventDefault();
           }
          });
      })(window);