
'use strict';

var config = {
	timestamp: Date.now(),
	dev: true,

	url: null,
	urlLocal	: 'cordovaremoteupdate.dev', // developer remote files
	urlProd		: 'cordovaremoteupdate.com', // production remote files

	// set URL where files are
	setURL: function(){
		if(this.dev)
			this.url = this.urlLocal;
		else
			this.url = this.urlProd;
	}
};

config.setURL();

module.exports = config;