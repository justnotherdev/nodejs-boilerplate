import { Response } from 'express';

const Status = {
	OK: 200,
	CREATED: 201,
	DELETED: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	SERVER_ERROR: 500
};

const statusMessage = (status: number) => {
	switch (status) {
		case Status.OK:
			return 'OK';
		case Status.CREATED:
			return 'Created';
		case Status.DELETED:
			return 'Deleted';
		case Status.BAD_REQUEST:
			return 'Bad Request';
		case Status.UNAUTHORIZED:
			return 'Unauthorized';
		case Status.FORBIDDEN:
			return 'Forbidden';
		case Status.NOT_FOUND:
			return 'Not Found';
		case Status.SERVER_ERROR:
			return 'Internal Server Error';
		default:
			throw new Error('Invalid status code');
	}
};

type ErrorObject = {
	message: string;
	stacktrace?: string;
};

interface ResponseStructure {
	status: string;
	data?: Record<string, any>;
	error?: ErrorObject;
}

type ResponseOptions = {
	httpCode: number;
	content?: Record<any, any> | Error;
};

const httpResponse = (res: Response, opts: ResponseOptions) => {
	const body: ResponseStructure = { status: statusMessage(opts.httpCode) };

	if (opts.httpCode >= 400 && opts.httpCode <= 500) {
		if (opts.content instanceof Error) {
			body.error = {
				message: opts.content.message,
				stacktrace: opts.content.stack
			};
		}
	} else {
		body.data = opts.content;
	}

	res.status(opts.httpCode || Status.OK).json(body || null);
};

const ok = (res: Response, data: Record<string, any>): void => {
	return httpResponse(res, { httpCode: Status.OK, content: data });
};

const created = (res: Response, data: Record<string, any>): void => {
	return httpResponse(res, { httpCode: Status.CREATED, content: data });
};

const deleted = (res: Response, data: Record<string, any>): void => {
	return httpResponse(res, { httpCode: Status.DELETED, content: data });
};

const badRequest = (res: Response, error: Error): void => {
	return httpResponse(res, { httpCode: Status.BAD_REQUEST, content: error });
};

const unauthorized = (res: Response, error: Error): void => {
	return httpResponse(res, { httpCode: Status.UNAUTHORIZED, content: error });
};

const forbidden = (res: Response, error: Error): void => {
	return httpResponse(res, { httpCode: Status.FORBIDDEN, content: error });
};

const notFound = (res: Response): void => {
	return httpResponse(res, { httpCode: Status.NOT_FOUND });
};

const serverError = (res: Response, error: Error): void => {
	return httpResponse(res, { httpCode: Status.SERVER_ERROR, content: error });
};

export { ok, created, deleted, badRequest, unauthorized, forbidden, notFound, serverError };
