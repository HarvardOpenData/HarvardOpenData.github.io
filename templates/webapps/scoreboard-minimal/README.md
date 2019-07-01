# Scoreboard

This represents the root of the Scoreboard project. 

## Workflow

- Make sure you have NodeJS and `npm` (the Node package manager) installed. You might able to use `yarn` as well but I'm not 100% on that.
- Run `npm install` in order to install any necessary dependencies.
- Write some code.
- Test it by running `npm start` in your favorite terminal app whilst in the root directory of the project (i.e. where this readme is) and navigating to `localhost:8080`.
- Once you're ready, run `./build.sh`. The last command moves the bundled `scoreboard.js` into the correct directory so that the webapp may be served on the website.

### Additional notes

If you're planning on making any changes to `dist/index.html` (preferably don't unless it's absolutely necessary; most things, including styling, can be accomplished through React), please make sure that those changes are also reflected in `webapps/scoreboard.html`. `dist/index.html` is used for testing the webapp via `npm start` and is not actually compatible with the templating system we use in production; `webapps/scoreboard.html`, on the other hand, is. You're certainly welcome to write a script that copies `dist/index.html` and modifies into a template compatible with Jinja. 

## Contributing

Here are some things you can do to improve the frontend of the scoreboard project.

- Add more pretty and informative Plotly graphs.
  - You can refer to HODP documentation for improving the Gocrimson scraper if you want to collect more data, but be mindful of `Scoreboard.js`'s assumptions of how the data is organized in Firestore
- Improve the styling of the scoreboard.
- Write some sort of script that resolves the issue described under "Additional notes."
- Reduce the size of the production JS bundle using fancy webpack code-splitting.
  - To this end, it also might be worth switching the libraries the project uses (e.g. Preact instead React).
- Literally anything :)
  

