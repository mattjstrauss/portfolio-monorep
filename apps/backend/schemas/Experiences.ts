import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';

export const Experiences = {
	Experience: list({
		// WARNING
		//   for this starter project, anyone can create, query, update and delete anything
		//   if you want to prevent random people on the internet from accessing your data,
		//   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
		access: allowAll,

		// this is the fields for our Post list
		fields: {
			companyName: text({ validation: { isRequired: true } }),
			positionTitle: text({ validation: { isRequired: true } }),
			// the document field can be used for making rich editable content
			//   you can find out more at https://keystonejs.com/docs/guides/document-fields
			description: document({
				formatting: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
					[2, 1],
					[1, 2],
					[1, 2, 1],
				],
				links: true,
				dividers: true,
			}),

			// with this field, you can add some Skills to Experiences
			skills: relationship({
				// we could have used 'Tag', but then the relationship would only be 1-way
				ref: 'Skill.experiences',

				// a Post can have many Skills, not just one
				many: true,

				// this is some customisations for changing how this will look in the AdminUI
				ui: {
					displayMode: 'cards',
					cardFields: ['name'],
					inlineEdit: { fields: ['name'] },
					linkToItem: true,
					inlineConnect: true,
					inlineCreate: { fields: ['name'] },
				},
			}),
		},
	}),
};
