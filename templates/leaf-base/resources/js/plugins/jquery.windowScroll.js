(function ( $, Client, document, undefined ) {

    "use strict";

    Client.windowScroll = {
        
        config: {
            "targetElems": $(".js-scroll-btn"),
            "speed": 350,
            "offset": 20,
            "easing": null,
            "beforeScroll": null,
            "afterScroll": null
        },

        vars: {
            dataHashArray: []
        },

        init: function( config ) {
            var self = this;

            // Apply User Config
            if ( typeof config == 'object' ) {
                self.config = $.extend( {}, self.config, config );
            }
                
            // Bind the buttons
            this.bindButtons();

        },

        bindButtons: function() {
            var self = this,
                dataScollElem = $('[data-scroll-start], [data-scroll-start][href^="#"]'),
                hashElem = $('[href^="#"]').not('[data-scroll-start]');

            // Data-scroll-start Attribute Takes Priority
            if ( dataScollElem.length ) {

                dataScollElem.on('click', function( e ) {
                    var $this = $(this),
                        dataScrollData = $this.data('scroll-start');

                    // Call Button Events Setup
                    self.buttonEvents.call( self, $this, dataScrollData );

                    // Prevent Normal Click Event
                    e.preventDefault();
                });

            }

            if ( hashElem.length ) {

                hashElem.on('click', function( e ) {
                    var $this = $(this),
                        hashElemDataRaw = $this.attr('href'),
                        hashElemDataRefined = hashElemDataRaw.substring(1);

                    // Call Button Events Setup
                    self.buttonEvents.call( self, $this, hashElemDataRefined );

                    // Prevent Normal Click Event
                    e.preventDefault();

                });

            }

        },

        buttonEvents: function( thisBtn, sourceData ) {
            var self = this,
                destination = this.getOffset.call(this, sourceData );


            if ( typeof this.config.beforeScroll === "function" ) {

                // Fire Before Function
                this.setupBeforeScroll().done(function(){
                    
                    // Animate The Scroll
                    self.animateScroll( destination );

                });
            } else {

                // Animate The Scroll
                this.animateScroll( destination );
            }

        },

        getOffset: function( btnData ) {
            var destination = $('#' + btnData);

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
