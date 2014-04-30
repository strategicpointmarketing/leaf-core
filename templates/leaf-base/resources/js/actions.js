( function ($, Client, document, undefined) {

    "use strict";

    Client.defaultWindowScroll = {

        // Initialize Window Scroll Plugin
        init: function() {
            Client.windowScroll.init();
        }

    };

    Client.mainNavigation = {
        
        // Internal Varibales
        vars: {
            targetElems: $('.thumb-scroll__nav'),
            pluginSrc: '/templates/leaf-base/resources/js/plugins/jquery.thumbScrollNav.js'
        },

        init: function() {
            this.elemsExist();
        },

        elemsExist: function() {

            if ( this.vars.targetElems.length ) {

                // Ajax the script
                this.loadScript();
            }

        },

        loadScript: function() {
            var self = this;

            $.ajax({
                url: self.vars.pluginSrc,
            })
            .done(function() {
                Client.thumbScrollNav.init( self.vars.targetElems );
            });
        }

    };

    Client.twitterCalls = {
        init: function() {
            $('ul.tweets').queryTwitter({
                
            });
        }
    };

    // Call the script
    Client.defaultWindowScroll.init();
    Client.mainNavigation.init();
    Client.twitterCalls.init();

}( jQuery, window.Client = window.Client || {}, document ));
