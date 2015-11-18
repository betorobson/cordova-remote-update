
'use strict';

var config = {
	timestamp: Date.now(),
	debug: false,

	url: null,
	urlLocal	: 'cordovaremoteupdate.dev', // developer remote files
	urlProd		: 'cordovaremoteupdate.com', // production remote files

	// set URL where files are
	setURL: function(){
		if(this.debug)
			this.url = this.urlLocal + this.getDirDest();
		else
			this.url = this.urlProd;
	}
};

config.setURL();

module.exports = config;