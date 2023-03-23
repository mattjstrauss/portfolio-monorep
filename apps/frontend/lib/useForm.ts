import { useState } from 'react';

interface IInitialFormValues {
	name: string;
	description: string;
	startDate?: string;
	endDate?: string;
}

interface IEventTargetTypes {
	name: string;
	value: string | number | File;
	type: string;
}

export default function useForm() {
	const initialValues = {
		name: '',
		description: '',
		startDate: '',
		endDate: '',
	};
	// create a state object for our inputs
	const [inputs, setInputs] = useState<IInitialFormValues>(initialValues);

	const handleChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		let { name, value, type }: IEventTargetTypes = e.target;
		if (type === 'number') {
			value = parseInt(value);
		}
		if (type === 'file') {
			// @ts-ignore
			value = (e.target as HTMLInputElement).files[0];
		}
		setInputs({
			// copy/spread existing state
			...inputs,
			[name]: value,
		});
	};

	function resetForm() {
		setInputs(initialValues);
	}

	const clearForm = (
		e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(([key, _]) => [key, '']),
		);
		return setInputs({ ...initialValues, ...blankState });
	};

	// return what we need from this hook
	return { inputs, handleChange, resetForm, clearForm };
}
