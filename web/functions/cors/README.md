# CORS Function

Netlify function to set up CORS for API requests.

## Usage

First, the spreadsheet must be shared with the service account `hodp-netlify@hodp-sheets.iam.gserviceaccount.com`. Then, to use in code:
```js
const info = await fetch(`/.netlify/functions/cors?url=${url}`, {headers: {accept: "Accept: application/json"}});
// url is the url endpoint for the api
```

## License
[MIT](https://choosealicense.com/licenses/mit/)