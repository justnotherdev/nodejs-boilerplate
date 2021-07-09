import { Request, Response } from 'express';
import { ProductUsecase } from '@/application/use-cases';
import { injectable, inject } from 'tsyringe';
import { ok, serverError } from '../helpers';
//import { ProductDTO } from '../../application/data-transfer/product.dto';

@injectable()
export class ProductController {
	constructor(@inject('ProductUsecase') private readonly productUsecase: ProductUsecase) {}

	public findAll = async (req: Request, res: Response): Promise<void> => {
		try {
			// make http classic validations
			const aProducts = await this.productUsecase.getProducts();
			return ok(res, aProducts);
		} catch (error) {
			return serverError(res, error as Error);
		}
	};

	public findAllWithLimit = async (req: Request, res: Response): Promise<void> => {
		try {
			// make http classic validations
			const aProducts = await this.productUsecase.getProductsWithLimit();
			return ok(res, aProducts);
		} catch (error) {
			return serverError(res, error as Error);
		}
	};
}
