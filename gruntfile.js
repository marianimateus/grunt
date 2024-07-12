module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/style.css': 'source/styles/style.less'
                }
            },
            production: {
                options: {
                    compress: true, 
                }, 
                files: {
                    'dist/styles/style.min.css': 'source/styles/style.less'
                }
            }
        },
        watch: {
            less: {
                files: ['source/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['source/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/style.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../source/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true, 
                        flatten: true,
                        src: ['source/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/style.min.css'
                        }
                    ]
                },
                files: [
                    {
                        expand: true, 
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin:{
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'source/index.html'
                }
            }
        },
        clean: ['prebuild']
    })

    grunt.loadNpmTasks('grunt-contrib-clean'); // exclui uma pasta específica

    grunt.loadNpmTasks('grunt-contrib-htmlmin'); // minifica html

    grunt.loadNpmTasks('grunt-replace'); // mudar arquivos específicos

    grunt.loadNpmTasks('grunt-contrib-watch'); // assiste as alterações e automaticamente compila

    grunt.loadNpmTasks('grunt-contrib-less'); // compila less em css

    grunt.registerTask('default', ['watch']); // tarefa padrao para fazer a observação de mudanças no codigo less e html

    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean']);

}