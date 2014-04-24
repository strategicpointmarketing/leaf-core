( function ($, Client, document, undefined) {

    "use strict";

    Client.defaultWindowScroll = {

        // Initialize Window Scroll Plugin
        init: function() {
            Client.windowScroll.init();
        }

    };

    // Call the script
    Client.defaultWindowScroll.init();

}( jQuery, window.Client = window.Client || {}, document ));
