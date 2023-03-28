import useForm from '../../lib/useForm';
import Form from './styles';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import DisplayError from '../ErrorMessage';
import dayjs from 'dayjs';

const CREATE_EXPERIENCE_MUTATION = gql`
	mutation CREATE_EXPERIENCE_MUTATION(
		# Which variables are getting passed in and what types are they
		# $company: String!
		# $logo: Upload
		$title: String!
		$startDate: CalendarDay
		$endDate: CalendarDay
	) {
		createExperience(
			data: {
				title: $title
				startDate: $startDate
				endDate: $endDate
				# company: { name: $company }
			}
		) {
			id
			title
			startDate
			endDate
		}
	}
`;

export default function AddExperience() {
	const { inputs, handleChange, clearForm } = useForm();

	const [createExperience, { loading, error, data }] = useMutation(
		CREATE_EXPERIENCE_MUTATION,
		{
			variables: inputs,
			context: {
				headers: {
					'apollo-require-preflight': true,
				},
			},
		},
	);
	return (
		<Form
			onSubmit={async (e) => {
				e.preventDefault();
				console.log(inputs);
				// Submit the input fields to the backend:
				await createExperience();
				clearForm(e);
			}}
		>
			<DisplayError error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
				<label htmlFor="logo">
					Logo
					<input type="file" id="logo" name="logo" onChange={handleChange} />
				</label>
				<label htmlFor="company">
					Company Name
					<input
						type="text"
						id="company"
						name="company"
						placeholder="Company Name"
						value={inputs.company}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="name">
					Title
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Title"
						value={inputs.title}
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
