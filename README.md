# Tixit: dropboxIntegration

This is a [Tixit](https://tixit.me/) plugin that allows users to add files from their Dropbox account to a ticket.

![Example of dropboxIntegration](https://github.com/cookiesncream716/dropboxIntegration/blob/master/dropboxExample.png?raw=true)

### Configuration Options
* ***`filesListField`*** - The name of the compound field that stores the list of files.
* ***`subfields`*** - An object containing the names of the subfields to the `filesListField`.
	* ***`nameField`*** - The name of the subfield used to store the name of the file.
	* ***`linkField`*** - The name of the subfield used to store the link to the file.

### Required Ticket Schema Fields
|    Name   |   Type   | List | Initial Value | Editable | Choices | Required |
|:---------:|:--------:|:----:|:-------------:|:--------:|:-------:|:--------:|
| filesList | compound |   X  |               |     X    |         |          |
|    name   |   text   |      |               |     X    |         |          |
|    link   |   text   |      |               |     X    |         |          |

For more information about Tixit plugins go here: [http://docs.tixit.me/d/Plugin_API](http://docs.tixit.me/d/Plugin_API).

### License
Released under the MIT license: [https://opensource.org/license/MIT](https://opensource.org/licenses/MIT)