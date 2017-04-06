// my-tweets
//
// spotify-this-song
//
// movie-this
//
// do-what-it-says
//
// node dixby.js my-tweets
//
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
// node dixby.js spotify-this-song '<song name here>'
//
// This will show the following information about the song in your terminal/bash window
//
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// if no song is provided then your program will default to
//
// "The Sign" by Ace of Base
// node dixby.js movie-this '<movie name here>'
//
// This will output the following information to your terminal/bash window:
//
//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
//   * Rotten Tomatoes Rating.
//   * Rotten Tomatoes URL.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//
// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!
// node dixby.js do-what-it-says
//
// Using the fs Node package, DIXBY will take the text inside of random.txt and then use it to call one of DIXBY's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
const keys = require('./keys.js')
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: 'Gf0bMQtro98pnCACMhHdI4sIc',
  consumer_secret: 'AtrnffBKsqagqxZVi6FtqzBrRkwhTdEK7LZgAt6LkMmGxln18N',
  access_token_key: '135357003-JITV5uk6cQnhLHU0aEUM4wS85tt49PzSSJ8olO7X',
  access_token_secret: 'j1W8NNQMU6d5E3BuRy4KoRfJzdb8WxBJEePKzcIpDGLex'
});

const params = {screen_name: 'AJFord93'};



const request = require('request');
const spotify = require('spotify');
const fs = require('fs');

let option = process.argv[2];
let title = process.argv[3];

const queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json"
switch(option){
  case 'my-tweets':
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(JSON.stringify(tweets, null, 4));
    }
  });
  break;

  case 'spotify-this-song':
  spotify.search({ type: 'track', query: title }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    const item = data.tracks.items[0];

    console.log('Artist Name: ' + JSON.stringify(item.album.artists[0].name));
    console.log('Track Name: ' + JSON.stringify(item.name));
    console.log('Album Name: ' + JSON.stringify(item.album.name));
    console.log('Song Preview: ' + JSON.stringify(item.external_urls.spotify));
});
  break;

  case 'movie-this':
  request(queryURL, function (error, response, body) {
  console.log('Movie Title: ' + JSON.parse(body).Title);
  console.log('Release Year: ' + JSON.parse(body).Year);
  console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
  console.log('Country: ' + JSON.parse(body).Country);
  console.log('Language: ' + JSON.parse(body).Language);
  console.log('Plot: ' + JSON.parse(body).Plot);
  console.log('Actors: ' + JSON.parse(body).Actors);
  console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);

});
  break;

  case 'do-what-it-says':
  fs.readFile("random.txt", "utf8", function(err, data) {
    data = data.split(", ");

    option = data[0];
    title = data[1];
// wut? not to execute a switch within a switch? 


    });

  break;

}
