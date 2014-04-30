/*global module:false*/
module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    
    // Task configuration.
    concat: {
        dist: {
            src: ['lib/<%= pkg.name %>.js'],
            dest: 'dist/<%= pkg.name %>.js'
        }
    },
    qunit: {
        files: ['test/**/*.html']
    },
    watch: {
        less: {
            files: ['<%= r_less %>**/*.less'],
            tasks: ['less'],
            options: {
              spawn: true,
            }
        }
    },
    less: {
        development: {
            options: {
                paths: ["less"]
            },
            files: {
              "<%= c_css %>global.css": "<%= r_less %>global.less",
              "<%= c_css %>global-fixed.css": "<%= r_less %>global-fixed.less"
            }
        }
    },
    cssmin: {
        minify: {
            expand: true,
            cwd: '<%= c_css %>',
            src: ['*.css', '!*.min.css'],
            dest: '<%= c_css %>',
            ext: '.css'
        }
    },
    webfont: {
        // Icons
        icons: {

            // Source SVGs
            src: "<%= r_fonts %><%= pkg.name %>-icons/svg/*.svg",

            // Destination Folder
            dest: "<%= c_fonts %><%= pkg.name %>-icons/",

            // Destination CSS
            destCss: "<%= c_less %>",
            options: {
                font: '<%= pkg.name %>-icons',
                types: "eot,woff,ttf,svg",
                hashes: false,
                relativeFontPath: "<%= c_fonts %><%= pkg.name %>-icons/",
                template: "<%= r_fonts %><%= pkg.name %>-icons/template/template.css",
                stylesheet: "less",
                destHtml: "<%= c_fonts %><%= pkg.name %>-icons/",
                embed: true
            }
        }
    },

    // Other Vars
    project: "<%= pkg.name %>",
    docroot: "",
    views: "<%= docroot %>views/",
    leaf_base: "<%= docroot %>templates/leaf-base/",
    resources: "<%= leaf_base %>resources/",
    compiled: "<%= resources %>c/",

    // Complied
    c_less: "<%= compiled %>less/",
    c_css: "<%= compiled %>css/",
    c_fonts: "<%= compiled %>fonts/",
    c_js: "<%= compiled %>js/",

    // Resources
    r_less: "<%= resources %>less/",
    r_fonts: "<%= resources %>fonts/",
    r_js: "<%= resources %>js/",
    r_images: "<%= resources %>images/",
});

// These plugins provide necessary tasks.
// grunt.loadNpmTasks('grunt-contrib-uglify');
// grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-webfont');

// Default task.
grunt.registerTask('default', ['less']);
grunt.registerTask('refresh', ['less', 'webfont']);
grunt.registerTask('icons', ['webfont']);
grunt.registerTask('development', ['less']);
grunt.registerTask('production', ['less', 'cssmin']);

};