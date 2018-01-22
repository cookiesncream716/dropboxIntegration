(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dropboxIntegration"] = factory();
	else
		root["dropboxIntegration"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************************!*\
  !*** ./dropboxIntegration.js ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if(window.Dropbox){
	// already loaded
	console.log('already loaded')
	registerPlugin(proto(Gem, function(){
		this.name = 'DropboxIntegration'

		this.initialize = function(options){
			return {
				filesListField: 'filesList',
				subfields: {
					nameField: 'name',
					linkField: 'link'
				}
			}
		}

		this.requireFields = function(options){
			var ticketFields = {}
			var filesListSubfields = {}
			ticketFields[options.filesListField] = {
				type: 'compound',
				list: true,
				fields: filesListSubfields
			}
			filesListSubfields[options.subfields.nameField] = {type: 'text'} 
			filesListSubfields[options.subfields.linkField] = {type: 'text'}
			return ticketFields
		}

		this.build = function(ticket, optionsObservee, api){
			var that = this
			this.ticket = ticket
			this.filesListField = optionsObservee.subject.filesListField
			this.filesTable = Table()

			var buttonOptions = {
				success: function(files){
					console.log('files ', files)
					// save it to the ticket 
					files.forEach(function(file){
						var fields = optionsObservee.subject
						var data = {}
						data[fields.subfields.nameField] = file.name
						data[fields.subfields.linkField] = file.link
						ticket.get(that.filesListField).push(data)
					})
				},
				cancel: function(){

				},
				linkType: 'preview',
				multiselect: true,
				folderSelect: true			
			}
			var button = Button()
			button.domNode = Dropbox.createChooseButton(buttonOptions)
					
			if(ticket.get(this.filesListField).subject.length > 0){
				this.createTable()
			}

			this.add(button, this.filesTable)

			// update the table when a file is added or removed
			ticket.get(this.filesListField).on('change', function(){
				that.createTable()
			})

		}

		this.createTable = function(){
			console.log('create Table')
			var that = this
			this.filesTable.remove(this.filesTable.children) // creates new table rather than adding to existing table and getting repeats
			var rows = this.ticket.get(this.filesListField).subject
			rows.forEach(function(data, i){
				var linkCell = Text('link', data.link)
				var delButton = Button('Remove')
				that.filesTable.row([Text(data.name), linkCell, delButton])
				linkCell.on('click', function(){
					window.open(linkCell.text)
				})
				delButton.on('click', function(){
					console.log('clicked delete index ' + i + ' ' + linkCell.text)
					that.ticket.get(that.filesListField).splice(i, 1)
				})
			})
		}

		this.getStyle = function(){
			console.log('getStyle')
			return Style({
				$link: {
					color: 'rgb(52, 152, 219)'
				},
				Table:{
					display: 'block',
					marginTop: 15,
					TableCell: {
						minWidth: 125,
						$$lastChild: {
							paddingLeft: 10
						}
					}
				},
				Button: {
					display: 'block'
				}
			})
		}
	}))
}else{
	var st = document.createElement('script')
	st.setAttribute('type', 'text/javascript')
	st.setAttribute('src', 'https://www.dropbox.com/static/api/2/dropins.js')
	st.setAttribute('id', 'dropboxjs')
	st.setAttribute('data-app-key', 'by8mb3vsys1a607')
	document.head.appendChild(st)
	st.onload = function(){
		// now it's loaded
		console.log('now loaded')
		registerPlugin(proto(Gem, function(){
			this.name = 'DropboxIntegration'

			this.initialize = function(options){
				return {
					filesListField: 'filesList',
					subfields: {
						nameField: 'name',
						linkField: 'link'
					}
				}
			}

			this.requireFields = function(options){
				var ticketFields = {}
				var filesListSubfields = {}
				ticketFields[options.filesListField] = {
					type: 'compound',
					list: true,
					fields: filesListSubfields
				}
				filesListSubfields[options.subfields.nameField] = {type: 'text'} 
				filesListSubfields[options.subfields.linkField] = {type: 'text'}
				return ticketFields
			}

			this.build = function(ticket, optionsObservee, api){
				var that = this
				this.ticket = ticket
				this.filesListField = optionsObservee.subject.filesListField
				this.filesTable = Table()

				var buttonOptions = {
					success: function(files){
						console.log('files ', files)
						// save it to the ticket 
						files.forEach(function(file){
							var fields = optionsObservee.subject
							var data = {}
							data[fields.subfields.nameField] = file.name
							data[fields.subfields.linkField] = file.link
							ticket.get(that.filesListField).push(data)
						})
					},
					cancel: function(){

					},
					linkType: 'preview',
					multiselect: true,
					folderSelect: true			
				}
				var button = Button()
				button.domNode = Dropbox.createChooseButton(buttonOptions)
						
				if(ticket.get(this.filesListField).subject.length > 0){
					this.createTable()
				}

				this.add(button, this.filesTable)

				// update the table when a file is added or removed
				ticket.get(this.filesListField).on('change', function(){
					that.createTable()
				})

			}

			this.createTable = function(){
				console.log('create Table')
				var that = this
				this.filesTable.remove(this.filesTable.children) // creates new table rather than adding to existing table and getting repeats
				var rows = this.ticket.get(this.filesListField).subject
				rows.forEach(function(data, i){
					var linkCell = Text('link', data.link)
					var delButton = Button('Remove')
					that.filesTable.row([Text(data.name), linkCell, delButton])
					linkCell.on('click', function(){
						window.open(linkCell.text)
					})
					delButton.on('click', function(){
						console.log('clicked delete index ' + i + ' ' + linkCell.text)
						that.ticket.get(that.filesListField).splice(i, 1)
					})
				})
			}

			this.getStyle = function(){
				console.log('getStyle')
				return Style({
					$link: {
						color: 'rgb(52, 152, 219)'
					},
					Table:{
						display: 'block',
						marginTop: 15,
						TableCell: {
							minWidth: 125,
							$$lastChild: {
								paddingLeft: 10
							}
						}
					},
					Button: {
						display: 'block'
					}
				})
			}
		}))
	}
}

// add script tag for Dropbox Chooser
// var st = document.createElement('script')
// st.setAttribute('type', 'text/javascript')
// st.setAttribute('src', 'https://www.dropbox.com/static/api/2/dropins.js')
// st.setAttribute('id', 'dropboxjs')
// st.setAttribute('data-app-key', 'by8mb3vsys1a607')
// document.head.appendChild(st)

// function fireWhenReady(){
// 	if(typeof Dropbox.createChooseButton != 'undefined'){
// 		console.log('defined')
// 	}else{
// 		setTimeout(fireWhenReady, 100)
// 	}
// }
// $(document).ready(fireWhenReady)

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

// registerPlugin(proto(Gem, function(){
// 	this.name = 'DropboxIntegration'

// 	this.initialize = function(options){
// 		return {
// 			filesListField: 'filesList',
// 			subfields: {
// 				nameField: 'name',
// 				linkField: 'link'
// 			}
// 		}
// 	}

// 	this.requireFields = function(options){
// 		var ticketFields = {}
// 		var filesListSubfields = {}
// 		ticketFields[options.filesListField] = {
// 			type: 'compound',
// 			list: true,
// 			fields: filesListSubfields
// 		}
// 		filesListSubfields[options.subfields.nameField] = {type: 'text'} 
// 		filesListSubfields[options.subfields.linkField] = {type: 'text'}
// 		return ticketFields
// 	}

// 	this.build = function(ticket, optionsObservee, api){
// 		var that = this
// 		this.ticket = ticket
// 		this.filesListField = optionsObservee.subject.filesListField
// 		this.filesTable = Table()

// 		var buttonOptions = {
// 			success: function(files){
// 				console.log('files ', files)
// 				// save it to the ticket 
// 				files.forEach(function(file){
// 					var fields = optionsObservee.subject
// 					var data = {}
// 					data[fields.subfields.nameField] = file.name
// 					data[fields.subfields.linkField] = file.link
// 					ticket.get(that.filesListField).push(data)
// 				})
// 			},
// 			cancel: function(){

// 			},
// 			linkType: 'preview',
// 			multiselect: true,
// 			folderSelect: true			
// 		}
// 		var button = Button()
// 		button.domNode = Dropbox.createChooseButton(buttonOptions)
				
// 		if(ticket.get(this.filesListField).subject.length > 0){
// 			this.createTable()
// 		}

// 		this.add(button, this.filesTable)

// 		// update the table when a file is added or removed
// 		ticket.get(this.filesListField).on('change', function(){
// 			that.createTable()
// 		})

// 	}

// 	this.createTable = function(){
// 		console.log('create Table')
// 		var that = this
// 		this.filesTable.remove(this.filesTable.children) // creates new table rather than adding to existing table and getting repeats
// 		var rows = this.ticket.get(this.filesListField).subject
// 		rows.forEach(function(data, i){
// 			var linkCell = Text('link', data.link)
// 			var delButton = Button('Remove')
// 			that.filesTable.row([Text(data.name), linkCell, delButton])
// 			linkCell.on('click', function(){
// 				window.open(linkCell.text)
// 			})
// 			delButton.on('click', function(){
// 				console.log('clicked delete index ' + i + ' ' + linkCell.text)
// 				that.ticket.get(that.filesListField).splice(i, 1)
// 			})
// 		})
// 	}

// 	this.getStyle = function(){
// 		console.log('getStyle')
// 		return Style({
// 			$link: {
// 				color: 'rgb(52, 152, 219)'
// 			},
// 			Table:{
// 				display: 'block',
// 				marginTop: 15,
// 				TableCell: {
// 					minWidth: 125,
// 					$$lastChild: {
// 						paddingLeft: 10
// 					}
// 				}
// 			},
// 			Button: {
// 				display: 'block'
// 			}
// 		})
// 	}
// }))


/***/ })
/******/ ]);
});