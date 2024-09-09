import React, { FormEvent, useContext, useState } from 'react'
import { UserContext } from '../context'

export const AddUser: React.FC = () => {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error("UserContext must be used within a UserContext.Provider")
	}
	const { addUser } = context

	const [error, setError] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [age, setAge] = useState<string>('')
	const [salary, setSalary] = useState<string>('')

	const formClick = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault()

		if (name.trim() === '' || age.trim() === '' || salary.trim() === '') {
			setError('Please fill all fields')
			return
		}

		if (!/^\d+$/.test(age) || !/^\d+$/.test(salary)) {
			setError('Age and salary must be valid numbers')
			return
		}

		const ageNumber = parseInt(age, 10)
		const salaryNumber = parseInt(salary, 10)

		addUser({
			name,
			age: ageNumber,
			salary: salaryNumber
		})

		setName('')
		setAge('')
		setSalary('')
		setError('')
	}

	return (
		<>
			<h3>ADD USER</h3>
			<form onSubmit={formClick}>
				{error && <p style={{ color: 'red' }}>{error}</p>}
				<div>
					<label>Name:</label>
					<input
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<br />
				<div>
					<label>Age:</label>
					<input
						value={age}
						onChange={e => setAge(e.target.value)}
					/>
				</div>
				<br />
				<div>
					<label>Salary:</label>
					<input
						value={salary}
						onChange={e => setSalary(e.target.value)}
					/>
				</div>
				<br />
				<button type="submit">ADD</button>
			</form>
		</>
	)
}
