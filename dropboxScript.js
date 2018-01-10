var createScriptTag = function(){
	var st = document.createElement('script')
	st.setAttribute('type', 'text/javascript')
	st.setAttribute('src', 'https://www.dropbox.com/static/api/2/dropins.js')
	st.setAttribute('id', 'dropboxjs')
	st.setAttribute('data-app-key', 'by8mb3vsys1a607')
	document.head.appendChild(st)
}

module.exports = {createScriptTag}