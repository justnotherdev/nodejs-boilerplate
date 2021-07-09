import { container } from 'tsyringe';

import { registerRepositoryDependencies } from './repository-module';
import { registerUseCase } from './use-case-module';

function registerDependencies(): void {
	registerRepositoryDependencies();
	registerUseCase();
}

export { registerDependencies, container };
