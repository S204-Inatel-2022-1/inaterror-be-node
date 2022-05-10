import * as dotenv from 'dotenv';

dotenv.config();

export default {
	connectionString: process.env.CONNECTION_STR ?? '',
};
