'use strict'
var Dropbox2 = require('dropbox')
// var Dropbox3 = require('./dropboxScript')
// var dotenv = require('dotenv')
// require('dotenv').load()

// Dropbox3.createScriptTag()

// add script tag for Dropbox Chooser
var st = document.createElement('script')
st.setAttribute('type', 'text/javascript')
st.setAttribute('src', 'https://www.dropbox.com/static/api/2/dropins.js')
st.setAttribute('id', 'dropboxjs')
st.setAttribute('data-app-key', 'by8mb3vsys1a607')
document.head.appendChild(st)

function fireWhenReady(){
	if(typeof Dropbox.createChooseButton != 'undefined'){
		console.log('defined')
	}else{
		setTimeout(fireWhenReady, 100)
	}
}
$(document).ready(fireWhenReady)

// function loadScript(path, callback){
// 	var done = false
// 	var scr = document.createElement('script')

// 	scr.onload = handleLoad()
// 	scr.onReadyStateChange = handleReadyStateChange()
// 	scr.onerror = handleError()
// 	scr.src = 'https://www.dropbox.com/static/api/2/dropins.js'
// 	// scr.type = 'text/javascript'
// 	// scr.id = 'dropboxjs'
// 	// scr.data-app-key = 'by8mb3vsys1a607'
// 	document.body.appendChild(scr)

// 	function handleLoad(){
// 		if(!done){
// 			done = true
// 			callback('https://www.dropbox.com/static/api/2/dropins.js', 'ok')
// 		}
// 	}
// 	function handleReadyStateChange(){
// 		var state
// 		if(!done){
// 			state = scr.readyState
// 			if(state === 'complete'){
// 				handleLoad()
// 			}
// 		}
// 	}
// 	function handleError(){
// 		if(!done){
// 			done = true
// 			callback('https://www.dropbox.com/static/api/2/dropins.js', 'error')
// 		}
// 	}
// }

// loadScript()

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
		// var button = Doopbox.choose(buttonOptions)

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

