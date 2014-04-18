(function ( $, Client, document, undefined ) {

    "use strict";

    Client.windowScroll = {
        
        config: {
            "targetElems": $(".js-scroll-btn"),
            "speed": 350,
            "offset": 20,
            "beforeScroll": null,
            "afterScroll": null
        },

        init: function( config ) {
            var self = this;

            // Apply User Config
            if ( typeof config == 'object' ) {
                self.config = $.extend( {}, self.config, config );
            }

            // Check if target elems exist
            if ( this.config.targetElems.length ) {
                
                // Bind the buttons
                this.bindButtons();
            }

        },

        bindButtons: function() {
            var self = this;

            // Bind The On Click Events
            this.config.targetElems.on('click', function( e ){
                var $this = $(this),
                    btnData = $this.data('scroll-start');

                // Get The Target Elements Offset
                var destination = self.getOffset.call(self, btnData );

                if ( typeof self.config.beforeScroll === "function" ) {

                    // Fire Before Function
                    self.setupBeforeScroll().done(function(){
                        
                        // Animate The Scroll
                        self.animateScroll( destination );

                    });
                } else {

                    // Animate The Scroll
                    self.animateScroll( destination );
                }

                // Prevent Normal Click Event
                e.preventDefault();

            });

        },

        getOffset: function( btnData ) {
            var destination = $('#' + btnData + ', [data-scroll-end="' + btnData + '"]');

            // Return Top Offset Number
            return destination.offset().top;
        },

        animateScroll: function( dest ) {
            var self = this;

            // Animate
            $('html,body').animate({

                scrollTop: dest - this.config.offset

            }, this.config.speed)
                .promise()
                    .done(function(){
                        if( typeof self.config.afterScroll == "function" ) {
                            self.config.afterScroll();
                        }
                    });
        },

        setupBeforeScroll: function() {
            var self = this,
                deferred = new $.Deferred();

            self.config.beforeScroll( deferred );

            return deferred.promise();

        },

        // Usable Empty Functions
        beforeScroll: function() {},
        afterScroll: function() {}

    };

}( jQuery, window.Client = window.Client || {}, document ));
