'use strict'

var scriptLoaded = new Promise(function(resolve){
	var scriptTag = document.createElement('script')
	scriptTag.setAttribute('type', 'text/javascript')
	scriptTag.setAttribute('src', 'https://www.dropbox.com/static/api/2/dropins.js')
	scriptTag.setAttribute('id', 'dropboxjs')
	scriptTag.setAttribute('data-app-key', 'by8mb3vsys1a607')
	document.head.appendChild(scriptTag)
	scriptTag.onload = function(){
		// console.log('loaded script')
		resolve()
	}
})

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

		scriptLoaded.then(function(){
			that.filesTable = Table()
			var buttonOptions = {
				success: function(files){
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
					
			if(ticket.get(that.filesListField).subject.length > 0){
				that.createTable()
			}

			var block = Block(button, this.filesTable)
			that.add(block)

			// update the table when a file is added or removed
			ticket.get(that.filesListField).on('change', function(){
				that.createTable()
			})

		}) 
	}

	this.createTable = function(){
		// console.log('create Table')
		var that = this
		this.filesTable.remove(this.filesTable.children) // creates new table rather than adding to existing table and getting repeats
		var rows = this.ticket.get(this.filesListField).subject
		rows.forEach(function(data, i){
			var nameCell = Text('link', data.name)
			// var linkCell = Text('link', data.link)
			var delButton = Button('Remove')
			that.filesTable.row([nameCell, delButton])
			// linkCell.on('click', function(){
			// 	window.open(linkCell.text)
			// })
			nameCell.on('click', function(){
				window.open(data.link)
			})
			delButton.on('click', function(){
				console.log('clicked delete index ' + i + ' ' + data.link)
				that.ticket.get(that.filesListField).splice(i, 1)
			})
		})
	}

	this.getStyle = function(){
		return Style({
			Block: {
				padding: 10
			},
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