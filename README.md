# react-express-skeleton
Working on creating an all-inclusive skeleton of sorts for myself to use for different projects.

## File Structure
```
public/
  - index.html
  - styles.css (compiled css/scss)
  - app.js (transpiled/compiled React code)
src/
  - app/ (React code)
      - assets/
          - fonts/
          - images/
          - stylesheets/
      - components/
      - tests/
      - index.js (Webpack entry point)
  - server/ (Node/Express)
      - logs/
          - access.log
          - error_400.log
          - error_500.log
          - error_500_stack.log (full stack trace)
      - modules/
          - logger.js
      - routes/
          - main.js
      - server.js (server file)

README.md
.babelrc
.webpack.config.js
.package.json         
```

---

## React App ( src/app/ )
### Webpack Config
The Webpack config is pretty basic, it primarily just uses Babel and Sass loaders to transpile/compile the code.

It uses `extract-text-webpack-plugin` to extract the compiled CSS into its own file as opposed to being inlined in the JS.

If in `production` mode, it uses `uglifyjs-webpack-plugin` and `optimize-css-assets-webpack-plugin` to minify and optimize the JS and CSS.

There is also `image-webpack-loader` to help optimize image assets.

Lastly, it uses `css-hot-loader` to be able to hot-reload CSS changes (`webpack-dev-server --hot` only hot-reloads JS changes).

### Testing:
The current setup uses Jest with Enzyme as its testing framework.

### Other information:
* Currently the React structure is really basic, I plan to flesh it out a little more -- primarily in regards to a Redux directory structure.
* I plan to implement React Router as well

---

## Express Server ( src/server/ )
### server.js
The server file is pretty bare-bones, it takes in a `routes` file to use as the primary router and contains a couple fallbacks for 404 and 500 error handling.

### routes/main.js
The routes are set up to support a React application but also allow for server-side calls. The `/` route serves the `index.html` file for the client-side React application. The `/api/v1/*` routes are to handle server-side requests.

_NOTE:_ Once React Router is implemented in the app portion, the `/api/` routes should only be accessible via ajax. I still need to do some testing with this but the goal is for React Router to handle the client-side routing through the app while the Express router handles server-side requests (ajax, etc.) for data.

### Logging
The server file uses `morgan` to log requests to the `logs/access.log` file. For error logging, I wrote a small module in `modules/logger.js` to write to the error logs.
##### modules/logger.js
The `logger.js` file contains two reusable logging functions:
* `log_500(err, req)`:  this logs a short message to the `error_500.log` containing the IP, Date/Time, URL requested, and the Error Message. In addition, it also logs a more verbose record to the `error_500_stack.log` containing the IP, Date/Time, URL, and full stack from the error.
* `log_404(req)`: this logs a short message to the `error_404.log` containing the IP, Date/Time, and URL requested
