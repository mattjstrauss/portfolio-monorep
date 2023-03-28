// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config
import 'dotenv/config';
import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { Experiences } from './schemas/Experiences';
import { Users } from './schemas/Users';
import { Skills } from './schemas/Skills';
import { Companies } from './schemas/Companies';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';

const databaseURL =
	process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/portfolio';

export default withAuth(
	config({
		server: {
			cors: {
				origin: [process.env.FRONTEND_URL || 'http://localhost:3001'],
				credentials: true,
			},
		},
		db: {
			provider: 'mysql',
			url: databaseURL,
			onConnect: async (context) => {
				/* ... */
			},
			// Optional advanced configuration
			enableLogging: true,
			idField: { kind: 'uuid' },
		},
		lists: {
			...Users,
			...Experiences,
			...Skills,
			...Companies,
		},
		session,
	}),
);
