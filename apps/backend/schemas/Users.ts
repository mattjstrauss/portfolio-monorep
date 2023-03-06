import { list } from '@keystone-6/core';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
	text,
	relationship,
	password,
	timestamp,
} from '@keystone-6/core/fields';

import { allowAll } from '@keystone-6/core/access';

export const Users = {
	User: list({
		// WARNING
		//   for this starter project, anyone can create, query, update and delete anything
		//   if you want to prevent random people on the internet from accessing your data,
		//   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
		access: allowAll,

		// this is the fields for our User list
		fields: {
			// by adding isRequired, we enforce that every User should have a name
			//   if no name is provided, an error will be displayed
			name: text({ validation: { isRequired: true } }),

			email: text({
				validation: { isRequired: true },
				// by adding isIndexed: 'unique', we're saying that no user can have the same
				// email as another user - this may or may not be a good idea for your project
				isIndexed: 'unique',
			}),

			password: password({ validation: { isRequired: true } }),

			createdAt: timestamp({
				// this sets the timestamp to Date.now() when the user is first created
				defaultValue: { kind: 'now' },
			}),
		},
	}),
};
