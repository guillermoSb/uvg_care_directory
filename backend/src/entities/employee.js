 class Employee {
	constructor(employeeCode, name, lastName, location, position, email, phoneNumber, phoneNumber2) {
		this.employeeCode = employeeCode;
		this.name = name;
		this.lastName = lastName;
		this.location = location;
		this.position = position;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.phoneNumber2 = phoneNumber2;
	}

	toJSON() {
		return {
			employeeCode: this.employeeCode,
			name: this.name,
			lastName: this.lastName,
			location: this.location,
			position: this.position,
			email: this.email,
			phoneNumber: this.phoneNumber,
			phoneNumber2: this.phoneNumber2,
		};
	}
}

module.exports = Employee;