import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
//import { getServices, loadEnv } from '@sap/xsenv';
import { loadEnv } from '@sap/xsenv';
import { xssFilter, noSniff, hidePoweredBy, frameguard } from 'helmet';
//@ts-ignore
//import { JWTStrategy } from '@sap/xssec';
//import passport from 'passport';

import './alias-modules';

import { container, registerDependencies } from '@/infrastructure/di';
import { CONSTANTS } from '@/config';
import { notFound } from '@/infrastructure/helpers';
import { APIRouter } from '@/infrastructure/api';
import { AppLogger } from '@/infrastructure/logger';

class App {
	private _app: Application;
	private _apiRouter: APIRouter;

	constructor() {
		// Start the Application Logger
		AppLogger.configureLogger();
		// DI Configuration
		registerDependencies();
		// Start API Router
		this._apiRouter = new APIRouter(container);
		// Configure Express Server - Middlewares
		this._app = express();
		//// Body Parser
		this._app.use(json({ limit: '50mb' }));
		this._app.use(urlencoded({ limit: '50mb', extended: true }));
		//// CORS
		this._app.use(cors());
		//// Only-Production Middlewares
		if (CONSTANTS.environment === 'production') {
			//// Compression
			this._app.use(compression());
			//// Helmet
			this._app.use(xssFilter());
			this._app.use(noSniff());
			this._app.use(hidePoweredBy());
			this._app.use(frameguard({ action: 'deny' }));
		}
		// Get XSUAA Credentials
		loadEnv();
		//const services = getServices({ uaa: 'uaa_clinicainternacional' });
		//AppLogger.info('app.ts', services);
		// Passport - Define Auth Strategy
		//passport.use(new JWTStrategy(services.uaa));
		//this._app.use(passport.initialize());
		//this._app.use(passport.authenticate('JWT', { session: false }));
		// Configure Authentication
		// Load API Routes
		this._app.use(CONSTANTS.api.prefix, this._apiRouter.routes());
		this._app.use((req: Request, res: Response) => notFound(res));
	}

	public get app(): Application {
		return this._app;
	}
}

export default new App().app;
