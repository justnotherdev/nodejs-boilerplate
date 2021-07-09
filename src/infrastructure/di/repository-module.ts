import { container } from 'tsyringe';
import { AzureProductRepository } from '@/infrastructure/repository-impl/azure-product.repository.impl';
import { AppDependencies } from './type';

export function registerRepositoryDependencies(): void {
	container.register(AppDependencies.ProductRepository, {
		useClass: AzureProductRepository
	});
}
