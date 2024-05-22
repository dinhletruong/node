const express = require('express')
const app = express()
var axios = require('axios');
var moment = require('moment'); 

const port = 2712


function getStringBetween(input, startString, endString) {
    let startIndex = input.indexOf(startString);
    console.log(startIndex);
    if (startIndex === -1) {
        return "";
    }
    startIndex += startString.length;
    let endIndex = input.indexOf(endString, startIndex);
    if (endIndex === -1) {
        return "";
    }
    return input.substring(startIndex, endIndex);
}

app.get('/', async (req, res) => {
	const account = req.query.account
	const html = await axios('https://muabancoin.com/')
	const pattern = /_v="([^"]+)"/;
	const match = html.data.match(pattern);
	const vValue = match[1];
	const ts = moment().unix()
	console.log(`https://muabancoin.com/api/account.php?id=to&account=${account}&v=${vValue}&ts=${ts}`);
	const result = await axios(`https://muabancoin.com/api/account.php?id=to&account=${account}&v=${vValue}&ts=${ts}`)
	console.log(result.data);
	let match_2 = result.data.replace('getAccountCb("to",', '');
	match_2 = match_2.slice(0, -13)
	res.status(200).json(JSON.parse(match_2))
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


