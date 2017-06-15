# react-express-skeleton
NEED TO UPDATE: This is no longer a skeleton, it has evolved and is now a Spotify-fueled web app. I will be updating the repo name soon.

This project is a music discovery/information web app fueled by the Spotify API. It was done in an effort to teach myself some new things and practice some of the basics of using Express to handle OAuth requests server-side, as well as learn React, Redux, Webpack, and the Spotify API.

## Overview
### Technology:
* Basic Express server to handle OAuth request/response from Spotify
* Custom server-side logging of 404 and 500 errors, as well as an access log for server-side requests.
* React for client-side application
  * Redux combined with React-Router for state management
* Webpack + Babel for compiling/transpiling source code

### Client-Side Features:
_NOTE: This is a work in progress from both a design and functionality standpoint. The list below is a combination of the current and desired functionality._
#### Dashboard
* Your top 10 most listened to artists and tracks with the ability to toggle between "All Time", "6 Months", and "Recent".
* "Currently Playing" component that displays song information if you're currently playing anything through the Spotify app (currently disabled).

#### Artist Page
* Displays information about a particular artist.
* Currently displays name, image, albums, and list of associated genres

#### Album Page
* WIP - Currently Not Active - Features Will Include:
  * Track listing with sample clips
  * Title, Image
  * Breakdown of overall album sound using an average of the `/audio-features` information for each track on the album. This information includes how danceable, acoustic, instrumental, positive/negative, energetic, loud, and fast a track is.

#### Track Page
* WIP - Currently Not Active - Features Will Include:
  * Detailed track information for a given song (using the `/audio-analysis` information from Spotify)
  * Track clip sample

#### Genre Artists
* Currently this page shows 20 artists matching a selected genre. You get to this view by clicking on a genre listed on the Artist Page.

#### Search
* You can search for an artist, album, playlist, or particular genre (a genre search will display artists that match that genre).
  * Currently the results are limited to 50; I have not added pagination yet


### Still Todo:
* Tests -- Working a little backwards on this. I'm still learning the test framework (Jest), so I want to get the main functionality of the app done and then revisit/complete all the tests.


---

## Express Server ( src/server/ )
### server.js
The server file is pretty bare-bones, it takes in a `routes` file to use as the primary router and contains a couple fallbacks for 404 and 500 error handling.

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

If in `production` mode, it uses `uglifyjs-webpack-plugin` and `optimize-css-assets-webpack-plugin` to minify and optimize the JS and CSS.

There is also `image-webpack-loader` to help optimize image assets.

### Testing:
The current setup uses Jest with Enzyme as its testing framework.

---

## Other information:
This project, as mentioned, was done in an effort to get more familiar with Express, React, Redux, Webpack, and some other technologies. Amidst learning these, I am trying to do so with best practices in mind but being new to some of it there are definitely areas to grow in.
