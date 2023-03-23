import useForm from '../../lib/useForm';
import Form from './styles';

export default function AddExperience() {
	const { inputs, handleChange, clearForm } = useForm();
	function submitForm(e: { preventDefault: () => void }) {
		e.preventDefault();
		console.log(inputs);
	}
	return (
		<Form onSubmit={submitForm}>
			<fieldset aria-busy>
				<label htmlFor="image">
					Company Logo
					<input
						type="file"
						id="logo"
						name="logo"
						onChange={handleChange}
						required
					/>
				</label>
				<label htmlFor="name">
					Company Name
					<input
						type="text"
						id="company"
						name="company"
						placeholder="Company Name"
						value={inputs.name}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="description">
					Description
					<textarea
						id="description"
						name="description"
						placeholder="Description"
						value={inputs.description}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="startDate">
					Start Date
					<input
						type="date"
						id="startDate"
						name="startDate"
						placeholder="Start Date"
						value={inputs.startDate}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="endDate">
					End Date
					<input
						type="date"
						id="endDate"
						name="endDate"
						placeholder="End Date"
						value={inputs.endDate}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">+ Add Experience</button>
			</fieldset>
		</Form>
	);
}
