# Google Spreadsheet Function

Netlify function to access Google Spreadsheets API fetching data stored in google spreadsheets. More resources located [here](https://www.swyx.io/netlify-google-sheets/).

## Usage

First, the spreadsheet must be shared with the service account `hodp-netlify@hodp-sheets.iam.gserviceaccount.com` (doesn't need to be public). Then, to use in code:
```js
const data = await fetch(`/.netlify/functions/google-spreadsheet?id=${id}&table=${table}`, {headers: {accept: "Accept: application/json"}});
// id is the id of the spreadsheet that is being accessed
// table is the table of the spreadsheet that needs to be accessed
```

## License
[MIT](https://choosealicense.com/licenses/mit/)