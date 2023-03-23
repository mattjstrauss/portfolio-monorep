import useForm from '../../lib/useForm';
import Form from './styles';
import gql from 'graphql-tag';
import { document } from '@keystone-6/fields-document';
import { useMutation } from '@apollo/client';

const CREATE_SKILL_MUTATION = gql`
	mutation CREATE_SKILL_MUTATION(
		# Which variables are getting passed in and what types are they
		$name: String!
		$logo: Upload
	) {
		createSkill(
			data: { name: $name, logo: { create: { image: $logo, altText: $name } } }
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

	async function submitForm(e: { preventDefault: () => void }) {
		e.preventDefault();
		const res = await createSkill();
		console.log(res);
	}
	return (
		<Form
			onSubmit={async (e) => {
				e.preventDefault();
				console.log(inputs);
				// Submit the inputfields to the backend:
				await createSkill();
				clearForm(e);
			}}
		>
			<fieldset aria-busy>
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
