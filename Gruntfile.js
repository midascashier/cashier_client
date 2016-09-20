module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		liveInfo: {
			host: 'den.secureprivate.com',
			port: '',
			user: 'midas',
			password: 'Bx5J@Z=9u#ptL3+Z',
			virtual: 'midas',
			type: 'c.php',
			protocol: 'wss'
		},

		replaceConfig: {
			src: 'index.php',
			dist: 'dist/build/',
			bundleSrc: 'dist/bundle.js',
			epocTime: new Date().getTime()
		},

		'uglify': {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: '<%= replaceConfig.dist %>bundle.js',
				dest: '<%= replaceConfig.dist %><%= pkg.name %>-<%=replaceConfig.epocTime %>.min.js'
			}
		},

		'string-replace': {

			dist: {
				files: {
					'<%= replaceConfig.dist %>' : '<%= replaceConfig.src %>'
				},
				options: {
					replacements: [{
						pattern: /<script src=\"\/build\/bundle.js\"><\/script>/,
						replacement: '<script src=\"build/<%=pkg.name%>-<%=replaceConfig.epocTime %>.min.js\"></script>'
					}]
				}
			},

			dst: {
				files: {
					'dist/build/bundle.js' : 'dist/bundle.js'
				},
				options: {
					replacements: [{
						pattern: /(n.set\("host",\s?)"[^"]*"\s?\),/g,
						replacement: '$1"<%= liveInfo.host %>"),'
					}, {
						pattern: /(n.set\("port",\s?)"[^"]*"\s?\),/,
						replacement: '$1"<%= liveInfo.port %>"),'
					}, {
						pattern: /(n.set\("user",\s?)"[^"]*"\s?\),/,
						replacement: '$1"<%= liveInfo.user %>"),'
					}, {
						pattern: /(n.set\("pass",\s?)"[^"]*"\s?\),/,
						replacement: '$1"<%= liveInfo.password %>"),'
					}, {
						pattern: /(n.set\("virtual",\s?)"[^"]*"\s?\),/,
						replacement: '$1"<%= liveInfo.virtual %>"),'
					}, {
						pattern: /(n.set\("type",\s?)"[^"]*"\s?\),/,
						replacement: '$1"<%= liveInfo.type %>"),'
					}, {
						pattern: /(n.set\("protocol",\s?)"[^"]*"\s?\);/,
						replacement: '$1"<%= liveInfo.protocol %>");'
					}
					]
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-string-replace');

	grunt.registerTask('default', ['string-replace','uglify']);

};