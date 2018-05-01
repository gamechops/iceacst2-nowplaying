# icecast2-nowplaying
HTML Browser Source that pulls current track information from icecast2. Designed to work with DJ software to provide current track information inside of IP Broadcasting (Streaming) Software such as OBS, Xsplit, etc.

This replaces https://github.com/gamechops/traktor-nowplaying by removing the dependency on Python2, and making it a CSS customizable Browser Source instead of text sources to be consumed by IP Broadcasting (Streaming) Software. 

## Requirements
* icecast2 
    * You'll need to configure an [icecast2](http://icecast.org/) instance. This can be installed on the same computer that you will be streaming from, or on a server elsewhere.  For basic configurations, a default icecast2 installation is more than sufficient. 
* Something to broadcast to icecast2
    * Ideally, you're performing a DJ set, so you'll have some DJ performance software like Traktor, Serato, Mixxx, VirtualDJ, or something similar.  You'll need to configure it to broadcast to your icecast2 server.  Support for configuring your DJ software to talk to your icecast2 instance will be in your DJ software's documentation, or contact vendor support.  The instructions assume that you are able to brodcast successfully to your icecast2 server.  

## First Time Setup
* config.js
    * If you are using a default icecast2 installation on the same computer as your IP Broadcasting (Streaming) Software, no configuration of this file is necessary
    * If you are running an advanced configuration, you can change the address and/or port here.  

## Instructions
* Load the index.html file into a browser source within a scene in your IP Broadcasting (Streaming) Software. 
* Ensure your icecast2 server is running
* Ensure your DJ software is broadcasting to your icecast2 server
* Play music!

## Notes
Depending on your DJ software, it may take several seconds before it updates the icecast2 server with the current song information.  The browser source will check for new song information 5 times a second. 

