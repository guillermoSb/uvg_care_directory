const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Hello World');
})

app.listen(process.env.PORT || 3000, () => {
	console.info(`Server is running on port ${process.env.PORT || 3000}.`);
});