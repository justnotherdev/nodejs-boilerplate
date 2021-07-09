import { container } from 'tsyringe';
import { ProductUsecase } from '@/application/use-cases/product.usecase';
import { AppDependencies } from './type';

export function registerUseCase(): void {
	container.register(AppDependencies.ProductUsecase, {
		useClass: ProductUsecase
	});
}
