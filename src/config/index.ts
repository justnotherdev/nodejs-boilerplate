// Lazy loading for first verify environment
const initDotenv = () => require('dotenv');

if (process.env.NODE_ENV !== 'production') {
	const dotenv = initDotenv();
	const envFound = dotenv.config();
	if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const CONSTANTS = {
	/**
	 * Environment config
	 */
	environment: process.env.NODE_ENV || 'development',
	/**
	 * Port config
	 */
	port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
	/**
	 * Winston logger config
	 */
	logs: {
		directory: 'logs',
		level: process.env.LOG_LEVEL || 'silly'
	},
	/**
	 * API Route config
	 */
	api: {
		prefix: '/api/v1/inventory'
	}
};
