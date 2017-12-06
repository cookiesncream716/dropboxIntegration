'use strict'

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
		
	}
}))