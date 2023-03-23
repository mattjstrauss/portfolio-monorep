import { cloudinaryImage } from '@keystone-6/cloudinary';
import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const cloudinary = {
	cloudName: process.env.CLOUDINARY_CLOUD_NAME,
	apiKey: process.env.CLOUDINARY_API_KEY,
	apiSecret: process.env.CLOUDINARY_API_SECRET,
	folder: 'matthewjstrauss',
};
export const SkillLogos = {
	SkillLogo: list({
		// WARNING
		//   for this starter project, anyone can create, query, update and delete anything
		//   if you want to prevent random people on the internet from accessing your data,
		//   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
		access: allowAll,
		fields: {
			image: cloudinaryImage({
				// @ts-ignore
				cloudinary,
				label: 'Source',
			}),
			altText: text(),
			skill: relationship({ ref: 'Skill.logo' }),
		},
		ui: {
			listView: {
				initialColumns: ['image', 'altText', 'skill'],
			},
		},
	}),
};
