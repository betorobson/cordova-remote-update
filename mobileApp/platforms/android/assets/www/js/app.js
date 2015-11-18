/* globals console, device, cordova */

'use strict';

//////////////
///// App
//////////////

var app = {

	initialize: function() {
		console.log('app.js initialized');
		this.bindEvents();
	},

	bindEvents: function() {
		// in case of autoload invoke this function twice
		if(!window.bindedEvents){
			document.addEventListener('deviceready', this.onDeviceReady, false);
			document.addEventListener('resume', this.onResume, false);
			window.bindedEvents = true;
		}
	},

	onDeviceReady: function() {
		console.log('device ready');
		app.wrapper();
	},

	onResume: function() {
		console.log('app resumed');
	},

	// prevent Android to show any asset as images on native Gallery App
	writeNoMediaFile: function(){
		if(device.platform == 'Android'){
			console.log(cordova.file.externalRootDirectory);

			window.resolveLocalFileSystemURL(
				cordova.file.externalRootDirectory,
				function(dir){
					dir.getFile(
						'cordovaremoteupdate' + (window.DEVELOPMENT ? 'dev' : '') + '/.nomedia',
						{create:true},
						function(file) {
							console.log('got the file', file);
						}
					);
				}
			);
		}
	},

	wrapper: function(){
		document.querySelector('#appWrapper').innerHTML = 'Hello world 008';
	}

};

// It will be invoked after update has finished
var bootstrapCallback = function(){
	app.writeNoMediaFile();
};

app.initialize();

// DO NOT REMOVE NOTHING BELLOW
window.BOOTSTRAP_OK = true;