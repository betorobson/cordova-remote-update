/* global console, CordovaPromiseFS, CordovaAppLoader, CordovaFileCache*/

'use strict';

(function(){
	// Check for Cordova
	var isCordova = typeof cordova !== 'undefined',
	// CordovaPromiseFS
			fs,
	// CordovaFileLoader
			loader,
	// script-tag...
			script,
	// ...that contains the serverRoot
			serverRoot;

	// Get serverRoot from script tag.
	script = document.querySelector('script[server]');
	if(script) serverRoot= script.getAttribute('server');
	if(!serverRoot) {
		throw new Error('Add a "server" attribute to the bootstrap.js script!');
	}

	// Initialize filesystem and loader
	fs = new CordovaPromiseFS({
		persistent: isCordova, // Chrome should use temporary storage.
		Promise: Promise
	});

  var environment = '';
  if(window.DEVELOPMENT)
  	environment = 'dev';

  console.log('autoupdate environment: ' + environment);

	loader = new CordovaAppLoader({
		fs: fs,
		localRoot: 'cordovaremoteupdate' + environment,
		serverRoot: serverRoot,
		mode: 'mirror',
		cacheBuster: false
	});

	// Check > Download > Update
	function check(){
		console.log('check() invoked!');
		loader.check()
		.then(function(){
			//navigator.splashscreen.show();
			window.plugins.spinnerDialog.show('Updating','Wait until update has finished...', true);
			console.log('Downloading update...');
			return loader.download();
		})
		.then(function(){

			setTimeout(function(){
				//navigator.splashscreen.hide();
			},2000);

			window.plugins.spinnerDialog.hide();
			return loader.update();
		},function(err){
			console.error('Auto-update error:',err);
		});
	}

	// Couple events:

	// 1. On launch
	check();

	// 2. Cordova: On resume
	fs.deviceready.then(function(){
		document.addEventListener('resume',check);
	});

	// 3. Chrome: On page becomes visible again
	function handleVisibilityChange() {
		if (!document.webkitHidden) {
			check();
		}
	}
	document.addEventListener('webkitvisibilitychange', handleVisibilityChange, false);

})();