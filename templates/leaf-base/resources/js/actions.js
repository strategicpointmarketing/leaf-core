( function ($, Client, document, undefined) {

    "use strict";

    Client.defaultWindowScroll = {

        config: {
            beforeScroll: function( deferred ) {

                var timeOut = setTimeout( function() {
                    console.log('finished timeout');

                    deferred.resolve();

                }, 2000);

            },
            afterScroll: function() {
                console.log('after it scrolled');
            }
        },

        init: function() {
            Client.windowScroll.init( this.config );
        }

    };

    // Call the script
    Client.defaultWindowScroll.init();

}( jQuery, window.Client = window.Client || {}, document ));
