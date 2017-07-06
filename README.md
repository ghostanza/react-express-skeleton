# spotify-experiment

This project is a music discovery/information web app fueled by the Spotify API. It was done in an effort to teach myself some new things and practice some of the basics of using Express to handle OAuth requests server-side, as well as learn React, Redux, Webpack, and the Spotify API.

---

## Getting Started
To get your own version of this up and running just follow these steps:
1. Clone the repo
2. Run `npm install` to install the dependencies
3. Visit https://developer.spotify.com/my-applications/ and register a new application. This will generate your API key and secret.
4. On this same page, add your redirect URIs to handle the OAuth callback. The server file in this project uses `/api/v1/callback`, so the URI you give Spotify must contain that endpoint. For example, if the server is running on port `8080` (which the file in this project does by default), to run the application locally you must register `http://localhost:8080/api/v1/callback` as a valid redirect URI for Spotify. Remember to press Save after entering your URIs!
5. Inside the repo, create a `.env` file containing your Spotify API credentials:
  ```
  CLIENT_ID='YOUR_CLIENT_ID'
  CLIENT_SECRET='YOUR_CLIENT_SECRET'
  REDIRECT_URI='http://localhost:8080/api/v1/callback'
  ```
  _NOTE: if you are using Heroku, you will need to specify these environment variables using the Heroku CLI_

6. Run `npm start` and visit the app in your browser

#### Other Notes:
* `npm run try` will compile your code in development mode and start up the server.
* `npm run build:dev` will compile your code in development mode
* `npm run build:prod` will compile your code in production mode

---

## Overview
### Technology:
* Basic Express server to handle OAuth request/response from Spotify
* Custom server-side logging of 404 and 500 errors, as well as an access log for server-side requests. _(this is currently commented out so it doesn't bloat the Heroku app)_
* React for client-side application
  * Redux combined with React-Router for state management
* Webpack for bundling

### Client-Side Features:
#### Dashboard
* Your top 10 most listened to artists and tracks with the ability to toggle between "All Time", "6 Months", and "Recent".
  * Clicking an artist name takes you to the artist's information page
  * _Note: The track information page is still a WIP, clicking a track takes you to it, but it is empty at the moment_
* "Currently Playing" component that displays song information if you're currently playing anything through the Spotify app (currently disabled).

#### Artist Page
* Displays information about a particular artist.
  * Artist name and image
  * Associated genres (link to genre artist search to show other artists in that genre)
  * Similar artists (link to artist information pages)
  * Albums / Singles (link to album information pages)
  * Top Tracks with audio clips

#### Album Page
* Album cover and name
* Artist name (links to artist page)
* Album label (links to results of artists in that label)
* Sound Overview (overall danceability, energy, etc. of an album)
* Track listing with audio clips

#### Playlist Page
* WIP - Currently Not Written - I may just update the album page to treat playlists as albums

#### Track Page
* WIP - Currently Not Active - Features Will Include:
  * Detailed track information for a given song (using the `/audio-analysis` information from Spotify)
  * Track clip samples

#### Search
* Artist (results link to artist information page)
* Album (results link to album information page)
* Playlist (_playlist landing page is not completed_)
* Genre (returns artists - results link to artist information page)
* Label (returns artists - results link to artist information page)

_Note: currently I have not added pagination so I am limiting the number of results to 30_


### Still TODO:
* Tests -- Working a little backwards on this. I'm still learning the test framework (Jest), so I want to get the main functionality of the app done and then revisit/complete all the tests.
* Playlist landing page
* Track page
* Ability to save artists, albums, etc. to your Spotify account
* _Potentially_ the ability to create playlists within your session and save it to spotify


---

## Express Server ( src/server/ )
### server.js
The server file is pretty bare-bones, it takes in a `routes` file to use as the primary router and contains a couple fallbacks for 404 and 500 error handling. Additionally, since the client-side application is a single page app, the server just redirects the user to the home page of the app (`/`) if they try to modify the URL in the browser.

### routes/main.js
The routes are set up to support a React application but also allow for server-side calls. The `/` route serves the `index.html` file for the client-side React application. The `/api/v1/*` routes are to handle server-side requests.

### Logging
The server file uses `morgan` to log requests to the `logs/access.log` file. For error logging, I wrote a small module in `modules/logger.js` to write to the error logs.
##### modules/logger.js
The `logger.js` file contains two reusable logging functions:
* `log_500(err, req)`:  this logs a short message to the `error_500.log` containing the IP, Date/Time, URL requested, and the Error Message. In addition, it also logs a more verbose record to the `error_500_stack.log` containing the IP, Date/Time, URL, and full stack from the error.
* `log_404(req)`: this logs a short message to the `error_404.log` containing the IP, Date/Time, and URL requested


---

## React App ( src/app/ )
### Webpack Config
The Webpack config is pretty basic, it primarily just uses Babel and Sass loaders to transpile/compile the code.

It uses `extract-text-webpack-plugin` to extract the compiled CSS into its own file as opposed to being inlined in the JS.

If in `production` mode, it uses `uglifyjs-webpack-plugin` and `optimize-css-assets-webpack-plugin` to minify and optimize the JS and CSS, it also uses `source-map` as the devtool in order to dramatically reduce the output size (my output went from 3MB to 300kb by adding this one change).

There is also `image-webpack-loader` to help optimize image assets.

### Testing
The current setup uses Jest with Enzyme as its testing framework.

### Helpers ( src/app/helpers/ )
* `spotify.js` - This file contains the API calls to the Spotify API. I made this to turn the API calls into functions (getArtistAlbums, getUserInfo, etc.) for easier reusability.

---

## Other information:
This project, as mentioned, was done in an effort to get more familiar with Express, React, Redux, Webpack, and some other technologies. Amidst learning these, I am trying to do so with best practices in mind but being new to some of it there are definitely areas to grow in.
