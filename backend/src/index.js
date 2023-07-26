const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { fetchAllEmployees, removeEmployee, addEmployee, updateEmployee, deleteAllEmployees, searchEmployee } = require('./controllers/employeeController');
require('dotenv').config()
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/employees', fetchAllEmployees);
app.get('/employees/search', searchEmployee);
app.post('/employees', addEmployee);
app.put('/employees/:employeeCode', updateEmployee);
app.delete('/employees/:employeeCode', removeEmployee);
app.delete('/employees', deleteAllEmployees);

// Start Listening
app.listen(process.env.PORT || 3000, () => {
	console.info(`Server is running on port ${process.env.PORT || 3000}.`);
});