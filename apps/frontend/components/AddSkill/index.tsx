import useForm from '../../lib/useForm';
import Form from './styles';
import gql from 'graphql-tag';
import { document } from '@keystone-6/fields-document';
import { useMutation } from '@apollo/client';
import DisplayError from '../ErrorMessage';

const CREATE_SKILL_MUTATION = gql`
	mutation CREATE_SKILL_MUTATION(
		# Which variables are getting passed in and what types are they
		$name: String!
		$logo: Upload
	) {
		createSkill(
			data: {
				name: $name
				logo: {
					create: {
						image: $logo # name of the input id
						altText: $name # name of the input id
					}
				}
			}
		) {
			id
			name
		}
	}
`;

export default function AddSkill() {
	const { inputs, clearForm, handleChange } = useForm();

	const [createSkill, { loading, error, data }] = useMutation(
		CREATE_SKILL_MUTATION,
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
				await createSkill();
				clearForm(e);
			}}
		>
			<DisplayError error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
				<label htmlFor="logo">
					Logo
					<input
						type="file"
						id="logo"
						name="logo"
						onChange={handleChange}
						required
					/>
				</label>
				<label htmlFor="name">
					Name
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Name"
						value={inputs.name}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">+ Add Skill</button>
			</fieldset>
		</Form>
	);
}
