import { cloudinaryImage } from '@keystone-6/cloudinary';
import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';

export const cloudinary = {
	cloudName: process.env.CLOUDINARY_CLOUD_NAME,
	apiKey: process.env.CLOUDINARY_API_KEY,
	apiSecret: process.env.CLOUDINARY_API_SECRET,
	folder: 'matthewjstrauss',
};
export const Skills = {
	Skill: list({
		// WARNING
		//   for this starter project, anyone can create, query, update and delete anything
		//   if you want to prevent random people on the internet from accessing your data,
		//   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
		access: allowAll,
		fields: {
			name: text({ validation: { isRequired: true } }),
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
			image: cloudinaryImage({
				// @ts-ignore
				cloudinary,
				label: 'Source',
			}),
			altText: text(),
			// this can be helpful to find out all the Experiences associated with a Skill
			experiences: relationship({
				ref: 'Experience.skills',
				many: true,
			}),
		},
		ui: {
			listView: {
				initialColumns: ['image', 'altText'],
			},
		},
	}),
};
