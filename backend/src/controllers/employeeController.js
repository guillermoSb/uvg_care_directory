
const employee_datasource = require('../data/employeeDatasource');
const Employee = require('../entities/employee');

let datasource = [
		new Employee('123', 'Guillermo', 'Santos', 'Guatemala', 'IT', 'g@g.com', '2313123123', null),
		new Employee('456', 'Sara', 'Paguaga', 'Guatemala', 'IT', 's@s.com', '2313123123', null),
	];

const fetchAllEmployees = async (req, res) => {
	try {
		
		const employees = await employee_datasource.fetchAllEmployees();
		
		// Fetch employees from the database
		return res.status(200).json({
			employees: employees.map(employee => employee.toJSON())
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			error: error.message,
		})
	}
};

const addEmployee = async (req, res) => {
	try {		
		const { employeeCode, name, lastName, location, position, email, phoneNumber, phoneNumber2 } = req.body;
		const employee = new Employee(employeeCode, name, lastName, location, position, email, phoneNumber, phoneNumber2);
		await employee_datasource.addEmployee(employee);
		const employees = await employee_datasource.fetchAllEmployees();
		return res.status(200).json({
						employees: employees.map(employee => employee.toJSON())

		})
	} catch (error) {
			console.error(error)
			res.status(500).json({
				error: error.message,
			})
	}
}

const removeEmployee = async (req, res) => {
	try {		
		const { employeeCode } = req.params;
		await employee_datasource.removeEmployee(employeeCode);
		const employees = await employee_datasource.fetchAllEmployees();
		return res.status(200).json({
						employees: employees.map(employee => employee.toJSON())

		})
	} catch (error) {
			console.error(error)
			res.status(500).json({
				error: error.message,
			})
	}
}

const deleteAllEmployees = async (req, res) => {
	try {		
		await employee_datasource.deleteAllEmployees();
		const employees = await employee_datasource.fetchAllEmployees();
		return res.status(200).json({
						employees: employees.map(employee => employee.toJSON())

		})
	} catch (error) {
			console.error(error)
			res.status(500).json({
				error: error.message,
			})
	}
}


const updateEmployee = async (req, res) => {
	try {		
		const { name, lastName, location, position, email, phoneNumber, phoneNumber2 } = req.body;
		const { employeeCode } = req.params;
		const employee = new Employee(employeeCode, name, lastName, location, position, email, phoneNumber, phoneNumber2);
		await employee_datasource.updateEmployee(employeeCode, employee);
		const employees = await employee_datasource.fetchAllEmployees();
		return res.status(200).json({
			employees: employees.map(employee => employee.toJSON())
		});
	} catch (error) {
			console.error(error)
			res.status(500).json({
				error: error.message,
			})
	}
}

const searchEmployee = async (req, res) => {
	try {
		const { query } = req.query;
		const employees = await employee_datasource.searchEmployee(query);
		return res.status(200).json({
			employees: employees.map(employee => employee.toJSON())
		});
		
	} catch (error) {
		console.error(error)
			res.status(500).json({
				error: error.message,
			})
	}
}


module.exports = { fetchAllEmployees, addEmployee, removeEmployee, updateEmployee, searchEmployee, deleteAllEmployees };