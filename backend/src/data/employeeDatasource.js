const { deleteAllEmployees } = require('../controllers/employeeController');
const Employee = require('../entities/employee');

class EmployeeDatasource {
	knex = require('knex')({
  client: 'pg',
		connection: {
			host: process.env.DB_HOST,
    	port: 5432,
    	user: 'inland',
    	database: 'care_uvg',
    	password: '12345678',
		}
	});
	


	/**
	 * Fetch employees from the database
	 * @returns {Promise<Employee[]>}
	 */
	async fetchAllEmployees() {
		const employees = await this.knex.select('*').from('employees');
		return employees.map(this.employeeFromRaw);
	}


	async addEmployee(employee) {
		// validate email does not exist
		const emailExists = await this.knex.select('*').from('employees').where('email', employee.email);
		if (emailExists.length > 0) {
			throw new Error('Ya existe un empleado con este correo.');
		}
		// validate code
		const codeExists = await this.knex.select('*').from('employees').where('code', employee.employeeCode);
		if (codeExists.length > 0) {
			throw new Error('Ya existe un empleado con este código.');
		}
		const rawEmployee = await this.knex('employees').insert(employee.toDB()).returning('*');
		return this.employeeFromRaw(rawEmployee[0]);
	}


	async removeEmployee(employeeCode) {
		const rawEmployee = await this.knex('employees').where('code', employeeCode).del().returning('*');
		return this.employeeFromRaw(rawEmployee[0]);
	}

	async deleteAllEmployees() {
		await this.knex('employees').del();
		return [];
	}

	async updateEmployee(employeeCode, employee) {
		const rawEmployee = await this.knex('employees').where('code', employeeCode).update(employee.toDB()).returning('*');
		return this.employeeFromRaw(rawEmployee[0]);

	}

	async searchEmployee(query) {
		// search by name, email, locality or corporate_position
		const employees = await this.knex.select('*').from('employees').where('name', 'ilike', `%${query}%`).orWhere('email', 'ilike', `%${query}%`).orWhere('locality', 'ilike', `%${query}%`).orWhere('corporate_position', 'ilike', `%${query}%`);
		return employees.map(this.employeeFromRaw);
	}

	/**
	 * 
	 * @param {*} rawEmployee 
	 * @returns {Employee}
	 */
	employeeFromRaw(rawEmployee) {
		return new Employee(rawEmployee.code, rawEmployee.name, rawEmployee.last_name, rawEmployee.locality, rawEmployee.corporate_position, rawEmployee.email, rawEmployee.phone, rawEmployee.phone2)
	}




}




module.exports = new EmployeeDatasource();