'use strict'
var Dropbox = require('dropbox')
// var dotenv = require('dotenv')
// require('dotenv').load()

// add script tag for Dropbox Chooser
var st = document.createElement('script')
st.setAttribute('type', 'text/javascript')
st.setAttribute('src', 'https://www.dropbox.com/static/api/2/dropins.js')
st.setAttribute('id', 'dropboxjs')
st.setAttribute('data-app-key', 'by8mb3vsys1a607')
document.head.appendChild(st)

registerPlugin(proto(Gem, function(){
	this.name = 'DropboxIntegration'

	this.build = function(ticket, optionsObservee, api){
		this.filesContainer = List()
		var buttonOptions = {
			success: function(files){
				files.forEach(function(file){
					// this.addToList(file)
					this.filesContainer.item(file)
				})
			},
			cancel: function(){

			},
			linkType: 'preview',
			multiselect: true,
			folderSelect: true			
		}
		// var dropboxButton = Button()
		var test = Button('dropbox')
		var button = Dropbox.createChooseButton(buttonOptions)
		// var addButton = Doopbox.choose(buttonOptions)

		// this.add(test, this.filesContainer)
		this.add(button, this.filesContainer)

		// test.on('click', function(){
		// 	console.log('clicked button')
		// 	Dropbox.createChooseButton(buttonOptions)
		// })
	}

	// this.addToList = function(file){
	// 	this.filesContainer.item(file)
	// }
}))

