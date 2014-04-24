(function ( $, Client, document, undefined ) {

    "use strict";

    reveal = {
        config: {
            targetElems: $('.js-tabs'),
            currentClass: 'is-current',
            dynoThumbs: false
        },
        
        vars: {
            currentTab: null,
        },

        init: function() {

            // Apply User Config
            if ( typeof config == 'object' ) {
                self.config = $.extend( {}, self.config, config );
            }

            // If Dynamic Thumbnails Is True
            if ( this.config.dynoThumbs === true ) {
                
                // Generate The Thumbnails
                this.dynamicThumbnails.init();

                // Set the Current Thumbnail
                this.dynamicThumbnails.setCurrent();
            }
            
            // Bind Tab Buttons
            tabbedWidget.bindTabButtons();

            // Find The Current Tab
            tabbedWidget.findCurrentTab();

        },

        hideTab: function() {

            // Remove .is-current from button
            this.config.targetElems
                .removeClass( this.config.currentClass );

            // Remove .is-current from tab
            $('.tab')
                .removeClass( this.config.currentClass );
        },

        revealTab: function( element ) {

            // Add .is-current to button
            element.addClass( this.config.currentClass );

            // Add .is-current to tab
            $( '#' + this.vars.currentTab )
                .addClass( this.config.currentClass );
        },

        findCurrentTab: function() {
            var currentTabPresent = this.config.targetElems.filter( '.' + this.config.currentClass );

            if ( currentTabPresent.length ) {
                // Set currentTab variable
                this.vars.currentTab = currentTabPresent.data('reveal');
            }
        },

        bindTabButtons: function() {
            var self = this;

            console.log(self.config.targetElems);

            this.config.targetElems.on('click', function( e ) {
                var $this = $(this);

                if ( !$this.hasClass( self.config.currentClass ) ) {

                    // Hide The Current Tab
                    self.hideTab();

                    // Update Current Tab Variable To New Tab
                    self.updateCurrentTab.call( self, $this );

                    // Reveeak The New Tab
                    self.revealTab.call( self, $this );


                    e.preventDefault();
                } else {
                    return false;
                }

            });
        },

        updateCurrentTab: function( element ) {

            // Update Current Tab Variable
            this.vars.currentTab = element.data('reveal');
        },

        dynamicThumbnails: {
            
            vars: {
                largeImgClass: 'dyno-img',
                thumbContainer: $('.thumb-container'),
                imgArray: []
            },

            init: function() {

                // Get the content for the thumbs
                this.getThumbs();

                // Load The Thumbs
                this.loadThumbs();
            },

            getThumbs: function() {
                var self = this;

                $('.' + this.vars.largeImgClass).each(function() {
                    self.vars.imgArray.push( $(this) );
                });

            },

            loadThumbs: function() {
                var self = this;

                this.vars.thumbContainer.html(function() {

                    // Loop Through The Array
                    for (var i = 0; i < self.vars.imgArray.length; i++) {
                        self.vars.imgArray[i]
                            .clone(true, true)
                            .appendTo( self.vars.thumbContainer )
                            .wrap('<li class="gd-columns gt-columns gm-columns gd-third gt-third gm-half pbs"><a href="#tab' + i + '"class="js-tabs" data-reveal="tab' + i + '"></a></li>');
                    }

                });

                tabbedWidget.config.targetElems = $('.js-tabs');
            },

            setCurrent: function() {
                var currentTabId = $( '.tab.' + tabbedWidget.config.currentClass ).attr('id');

                tabbedWidget.config.targetElems
                    .filter('[data-reveal="' + currentTabId + '"]')
                    .addClass( tabbedWidget.config.currentClass );
            }
        }

    };

}( jQuery, window.Client = window.Client || {}, document ));
