(function ( $, window, document, undefined ) {

    "use strict";

    window.windowScroll = {
        
        config: {
            targetElems: $(".js-scroll-btn"),
            speed: 350,
            offset: 20,
            "beforeScroll": null,
            "afterScroll": null
        },

        init: function() {

            // Check if target elems exist
            if ( this.config.targetElems.length ) {
                
                // Bind the buttons
                this.bindButtons();
            }

        },

        bindButtons: function() {
            var context = this;

            // Bind The On Click Events
            this.config.targetElems.on('click', function( e ){
                var $this = $(this),
                    btnData = $this.data('scroll-start');

                // Get The Target Elements Offset
                var destination = context.getOffset.call(context, btnData );

                if ( typeof context.config.beforeScroll == "function" ) {
                    
                    // Fire Before Function
                    context.config.beforeScroll();

                    // Animate The Scroll
                    // context.animateScroll( destination );
                } else {

                    // Animate The Scroll
                    context.animateScroll( destination );
                }

                // Prevent Normal Click Event
                e.preventDefault();

            });

        },

        getOffset: function( btnData ) {
            var destination = $('[data-scroll-end="' + btnData + '"]');

            // Return Top Offset Number
            return destination.offset().top;
        },

        animateScroll: function( dest ) {
            var context = this;

            // Animate
            $('html,body').animate({

                scrollTop: dest - this.config.offset

            }, this.config.speed)
                .promise()
                    .done(function(){
                        if( typeof context.config.afterScroll == "function" ) {
                            context.config.afterScroll();
                        }
                    });
        },

        // Aditional Empty Functions
        beforeScroll: function() {},
        afterScroll: function() {}

    };

}( jQuery, window, document, {} ));
