'use strict'
var Dropbox = require('dropbox')
// var dotenv = require('dotenv')
// require('dotenv').load()

registerPlugin(proto(Gem, function(){
	this.name = 'DropboxIntegration'

	// set plugin configuration options
	this.initialize = function(options){
		return{
			atttachmentsField: 'attachments',
			subfields: {
				urlField: 'url',
				typeField: 'type'
			}
		}
	}

	// ticket fields
	this.requireFields = function(options){
		var ticketFields = {}
		ticketFields[options.atttachmentsField] = {
			type: 'compound',
			list: true,
			fields: {
				url: {type: 'text'},
				type: {type: 'choice', choices: ['file', 'folder']}
			}
		}
		return ticketFields
	}

	this.build = function(ticket, optionsObservee, api){
		this.ticket = ticket
		this.optionsObservee = optionsObservee
		this.api = api
		this.atttachmentsField = optionsObservee.subject.atttachmentsField

		this.documents = Table()

		var dbx = new Dropbox({accessToken: ''});
		dbx.filesListFolder({path: ''})
		  .then(function(response) {
		    console.log(response);
		  })
		  .catch(function(error) {
		    console.log(error);
		  });
		console.log('dropbox ', dbx)

		this.add(Text('file', 'Add a file'), Text('folder', 'Add a folder'))
	}
}))