(function ( $, Client, document, undefined ) {

    "use strict";

    Client.overflowScroll = {

        vars: {
            targetElems: null
        },

        init: function( elem ) {
            
            // Set the target elem
            this.vars.targetElems = elem;

            var totalSize = 0;

            elem.find('li').each( function( index, el ) {
                totalSize = totalSize + $(this).outerWidth( true );
                console.log($(this).text() + ' : ' + $(this).outerWidth( true ));
            });

            this.vars.targetElems.css('width', (totalSize / 16) + 'em');

        }

    };

}( jQuery, window.Client = window.Client || {}, document ));
