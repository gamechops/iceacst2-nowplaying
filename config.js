/* 
icecastAddress: This is the address that your Icecast2 Installation is running at. 
                If it's running on the same computer as your streaming PC, the default is fine.
icecastPort:    This is the port that your Icecast2 Installation is running on.
                If you are using the default Icecast2 config, the default is fine.
*/

var icecastAddress = "localhost";
var icecastPort = "8000";

function isLoaded() {
    console.log("Config loaded")
}

isLoaded()