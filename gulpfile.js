/* global require */

'use strict';

var gulp = require('gulp');
var assetManifest = require('gulp-cordova-app-loader-manifest');
var handlebars = require('gulp-compile-handlebars');
var runSequence = require('run-sequence');

var config = require('./config.js');

var packageJson = require('./package.json');	
config.version = packageJson.version;

gulp.task('default',function(){
	gulp.start(['mobile']);
});

////////////////////////////////////////////////
///// Mobile
////////////////////////////////////////////////

gulp.task('mobile', function(){
	runSequence(
		'copyMobileAppFilesToMobileRemoteFolder',
		'bumpTimestampFile',
		'mobileMarkup',
		'generateManifest',
		'copyRemoteMobileFolderToMobileFolder',
		'bumpTimestampFile',
		'generateManifest'
	);
});

gulp.task('generateManifest', function(){
	return gulp.src([
			'remote-files/**/autoupdate.js',
			'remote-files/**/app.js',
			'remote-files/**',
			'!' + 'remote-files/manifest.json',
			'!' + 'remote-files/index.html',
			'!' + 'remote-files/img/**',
			'!' + 'remote-files/**/bootstrap.js',
			'!' + 'remote-files/**/cordova-app-loader-complete.js'
		])
		.pipe(assetManifest({
			load: [
				'js/autoupdate.js',
				'js/app.js',
				'js/timestamp.js'
			]
		}))
		.pipe(gulp.dest('remote-files/'));
});

gulp.task('mobileMarkup',function(){
	return gulp.src(['remote-files/index.html'])
		.pipe(handlebars(config))
		.pipe(gulp.dest('remote-files/'));
});

gulp.task('bumpTimestampFile',function(){
	gulp.src(['mobileApp/src/js/timestamp.js'])
		.pipe(handlebars({
			timestamp: Date.now()
		}))
		.pipe(gulp.dest('remote-files/js/'));
});

gulp.task('copyRemoteMobileFolderToMobileFolder', function(){
	return gulp.src([
			'remote-files/**/'
		])
		.pipe(gulp.dest('mobileApp/www/'));
});

gulp.task('copyMobileAppFilesToMobileRemoteFolder', function(){
	return gulp.src([
			'mobileApp/src/**'
		])
		.pipe(gulp.dest('remote-files/'));
});

