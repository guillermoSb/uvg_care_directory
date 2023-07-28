const { deleteAllEmployees } = require('../controllers/employeeController');
const Employee = require('../entities/employee');
require('dotenv').config();


class EmployeeDatasource {
	knex = require('knex')({
  client: 'pg',
		connection: {
			host: process.env.DB_HOST,
    	port: process.env.DB_PORT,
    	user: process.env.DB_USER,
    	database: process.env.DB_NAME,
    	password: process.env.DB_PASSWORD,
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
		
		// validate email does not exist
		const emailExists = await this.knex.select('*').from('employees').where('email', employee.email);
		if (emailExists.length > 0) {	
			if (emailExists[0].code !== employeeCode) {
				throw new Error('Ya existe un empleado con este correo.');
			}
		}

		const rawEmployee = await this.knex('employees').where('code', employeeCode).update(employee.toDB()).returning('*');
		return this.employeeFromRaw(rawEmployee[0]);
	}

	async searchEmployee(query) {

		// search by name, last name, full name, code, email, locality or position
		const query_wo_spaces = query.replace(/\s+/g, ' ');
		const employees = await this.knex.select('*')
			.from('employees')
			.whereRaw("regexp_replace(concat(name, ' ', last_name), '\\s+', ' ', 'g') ilike ?", [`%${query_wo_spaces}%`])
			.orWhere('code', 'ilike', `%${query_wo_spaces}%`)
			.orWhere('email', 'ilike', `%${query_wo_spaces}%`)
			.orWhere('locality', 'ilike', `%${query_wo_spaces}%`)
			.orWhere('corporate_position', 'ilike', `%${query_wo_spaces}%`);

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