import { list } from '@keystone-6/core';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import { text, relationship } from '@keystone-6/core/fields';

import { allowAll } from '@keystone-6/core/access';

// this last list is our skill list, it only has a name field for now
export const Skills = {
	Skill: list({
		// WARNING
		//   for this starter project, anyone can create, query, update and delete anything
		//   if you want to prevent random people on the internet from accessing your data,
		//   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
		access: allowAll,

		// setting this to isHidden for the user interface prevents this list being visible in the Admin UI
		ui: {
			isHidden: true,
		},

		// this is the fields for our Tag list
		fields: {
			name: text(),
			// this can be helpful to find out all the Experiences associated with a Skill
			experiences: relationship({ ref: 'Experience.skills', many: true }),
		},
	}),
};
