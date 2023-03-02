import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
	withItemData,
	statelessSessions,
} from '@keystone-next/keystone/session';

import 'dotenv/config';
import { User } from './schemas/User';

const databaseUrl =
	process.env.DATABASE_URL || 'mongodb://localhost/keystone-portfolio';

// Used to help authentication the keystone backend
const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in for?
	secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
	listKey: 'User', // Name of schema associated with authentication
	identityField: 'email', // Field to identify the identity
	secretField: 'password', // Field asked for when auth is identified
	initFirstItem: {
		// Enables a "first time" ever field to be created before any user exists
		fields: ['name', 'email', 'password'],
	},
	// TODO: Add initial roles here
});

// Keystone configurations
export default withAuth(
	config({
		server: {
			cors: {
				origin: [process.env.FRONTEND_URL],
				credentials: true,
			},
		},
		db: {
			adapter: 'mongoose',
			url: databaseUrl,
			// TODO: Add data seeding
		},
		// Keystone refers ta datatypes as "lists"
		lists: createSchema({
			// Schemas go here
			User: User,
		}),
		// Do you want people to be able to see the actual keystone CMS UI (BE)?
		ui: {
			// Show the keystone UI for people who pass this test
			isAccessAllowed: ({ session }) => {
				return !!session?.data;
			},
		},
		session: withItemData(statelessSessions(sessionConfig), {
			// GraphQL query of user session data
			User: 'id name email',
		}),
	}),
);
