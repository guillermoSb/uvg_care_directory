
const Employee = require('../entities/employee');

let datasource = [
		new Employee('123', 'Guillermo', 'Santos', 'Guatemala', 'IT', 'g@g.com', '2313123123', null),
		new Employee('456', 'Sara', 'Paguaga', 'Guatemala', 'IT', 's@s.com', '2313123123', null),
	];

const fetchAllEmployees = async (req, res) => {
	// Fetch employees from the database
	return res.status(200).json({
		employees: datasource.map(employee => employee.toJSON()),
	})
};

const addEmployee = async (req, res) => {
	const { employeeCode, name, lastName, location, position, email, phoneNumber, phoneNumber2 } = req.body;

	const errors = [];

    const emailExists = datasource.find(employee => employee.email === email);
    if (emailExists) {
        errors.push('Ya existe un empleado con este correo.');
    }

    const employeeCodeExists = datasource.find(employee => employee.employeeCode === employeeCode);
    if (employeeCodeExists) {
        errors.push('Ya existe un empleado con este código.');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            errors: errors,
        });
    }

	const newEmployee = new Employee(employeeCode, name, lastName, location, position, email, phoneNumber, phoneNumber2);
	datasource.push(newEmployee);
	return res.status(200).json({
		employees: datasource.map(employee => employee.toJSON()),
	})
}

const removeEmployee = async (req, res) => {
	const { employeeCode } = req.params;
	datasource = datasource.filter(employee => employee.employeeCode !== employeeCode);
	return res.status(200).json({
		employees: datasource.map(employee => employee.toJSON()),
	})
}

const deleteAllEmployees = async (req, res) => {
	datasource = [];
	return res.status(200).json({
		employees: datasource.map(employee => employee.toJSON()),
	})
}


const updateEmployee = async (req, res) => {

	const { employeeCode } = req.params;
	const { name, lastName, location, position, email, phoneNumber, phoneNumber2 } = req.body;
	const employeeIndex = datasource.findIndex(employee => employee.employeeCode === employeeCode);

	const emailExists = datasource.find(employee => employee.email === email && employee.employeeCode !== employeeCode);
	if (emailExists) {
		return res.status(400).json({
			message: 'Ya existe un empleado con este correo.',
		})
	}
	
	datasource[employeeIndex] = new Employee(employeeCode, name, lastName, location, position, email, phoneNumber, phoneNumber2);
	return res.status(200).json({
		employees: datasource.map(employee => employee.toJSON()),
	})
}

const searchEmployee = async (req, res) => {
	throw new Error('Not implemented');
}


module.exports = { fetchAllEmployees, addEmployee, removeEmployee, updateEmployee, searchEmployee, deleteAllEmployees };