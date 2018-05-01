var track = {
	name: "",
	artist: "",
	album: "",

	last: {
		name: "",
		artist: "",
		album: ""
	}
}

var icecastURL = "http://" + icecastAddress + ":" + icecastPort + "/status-json.xsl";

function writeTrack() {
	console.log("Writing Track Info");

	var nowPlaying = $(".now-playing");
	var trackName = $("#track-name");
	var trackArtist = $("#track-artist");
	var trackAlbum = $("#track-album");

	//Iterate through each child element of Now Playing
	$(".now-playing").children('div').each(function(i) {
		// Start the fade out animation
		if (!$(this).hasClass("static")) $(this).removeClass("slide-right");
		if (!$(this).hasClass("static")) $(this).delay(100*i).queue(function() {
			$(this).addClass("slide-left").dequeue();
		});


		$(this).on('animationend webkitAnimationEnd oAnimationEnd', function(e) {
			// Wait for the slide-left animation to complete

			// Set track name
			$("#track-name").text(track.name);
			track.last.name = track.name;

			// Set track artist
			// Don't prepend "By" if the artist is blank
			if (track.artist != "" && track.artist != '?') {
				$("#track-artist").text(track.artist);
			} else {
				$("#track-artist").text("")
			}
			track.last.artist = track.artist;

			// Set track album, but skip if it matches the track (singles)
			if (track.album.trim().toUpperCase() != track.name.trim().toUpperCase() && track.album != '?') {
				$("#track-album").text(track.album);
			}
			track.last.album = track.album;

			// Everything starts out hidden
			

			// Hide "By: Artist" elements if artist is blank
			if (track.artist == "" && $(this).attr("id") == "track-artist") $(this).css("visibility", "hidden");

			// If there's no track name, something is wrong. Hide everything!
			if (track.name == "") $(this).css("visibility", "hidden");

			// Start slide-right animation
			var indexLength = $(this).length;
			if (!$(this).hasClass("static")) $(this).removeClass("slide-left");
			if (!$(this).hasClass("static")) $(this).css("visibility", "visible");
			$(this).addClass("slide-right");
			/*if (!$(this).hasClass("static")) $(this).delay(100 * i).queue(function() {
				$(this).css("visibility", "visible");
				$(this).addClass("slide-right").dequeue();
			})*/
		})
	})

	console.log("Starting Animation");
}

function isUpdated() {
	// See if either the track name or artist has changed
	return (track.name != track.last.name || track.artist != track.last.artist)
}

function updateTrackInfo(file, type) {
	// Pull track and artist data from text files
	$.ajax({
		url: "../" + file,
		success: function(text) {
			// Parse foobar metadata from a single file
			if (type == "foobar") {
				var info = text.split('%');
				track.name = info[1];
				track.artist = info[2];
				track.album = info[3];
			} else {
				// Traktor writes to separate files
				track[type] = text;
			}
		},
		error: function(e) {
			track[type] = "";
		}
	})
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


function updateTrackInfoFromIceCast(icecastURL) {
	var request = new XMLHttpRequest();
	request.open('GET', icecastURL, true);

	request.onload = function() {
	if (this.status >= 200 && this.status < 400) {
		// Success!
		var data = JSON.parse(this.response);
			try {
				track.name = Object.is(data.icestats.source.title, undefined) ? "fart" : data.icestats.source.title;
				track.artist = Object.is(data.icestats.source.artist, undefined) ? "fart" : data.icestats.source.artist;
			}
			catch(err) {
				console.log("No Icecast data to load, will retry");
			}
	} else {
		// We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
}

setInterval(function() {
	// updateTrackInfo("nowPlaying.txt", "foobar");
	// updateTrackInfo("cutmanTitle.txt", "name");
	// updateTrackInfo("cutmanArtist.txt", "artist");
	//updateTrackInfo("cutmanAlbum.txt", "album");
	updateTrackInfoFromIceCast(icecastURL)

	if (isUpdated()) writeTrack();

}, 200);
