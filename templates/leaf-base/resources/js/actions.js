( function ($, Client, document, undefined) {

    "use strict";

    // Client.defaultWindowScroll = {

    //     // Initialize Window Scroll Plugin
    //     init: function() {
    //         Client.windowScroll.init();
    //     }

    // };

    Client.mainNavigationScroll = {
        
        // Internal Varibales
        vars: {
            targetElems: $('.scroll-nav'),
            pluginSrc: '/templates/leaf-base/resources/js/plugins/jquery.scrollNav.js'
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
                Client.overflowScroll.init( self.vars.targetElems );
            });
        }

    };

    // Call the script
    // Client.defaultWindowScroll.init();
    Client.mainNavigationScroll.init();

}( jQuery, window.Client = window.Client || {}, document ));
