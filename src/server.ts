import app from './app';
import { CONSTANTS } from './config';
import { AppLogger } from './infrastructure/logger';

app.listen(CONSTANTS.port)
	.on('listening', () => {
		AppLogger.info('server.ts', `Server Listening at port ${CONSTANTS.port}`);
	})
	.on('error', (err: Error) => {
		AppLogger.error('Error', err.message);
		process.exit(1);
	});
