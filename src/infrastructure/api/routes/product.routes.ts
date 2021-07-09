import { Router } from 'express';
import { ProductController } from '@/infrastructure/controllers';
import { DependencyContainer } from 'tsyringe';

export class ProductRouter {
	private router: Router;
	private productController: ProductController;

	constructor(container: DependencyContainer) {
		this.productController = container.resolve(ProductController);
		this.router = Router();
	}

	public routes(): Router {
		// CRUD
		// Create - Post
		// Read - Get (One and All)
		// Update - Put - Patch
		// Delete - Delete
		/**
		 * Create a new product
		 */
		// this.router.post('/', this.productController.create);
		/**
		 * Get all products
		 */
		this.router.get('/', this.productController.findAll);
		/**
		 * Get all products (with a predefined limit)
		 */
		this.router.get('/limit', this.productController.findAllWithLimit);
		/**
		 * Get a product by Id
		 */
		// this.router.get('/:id', this.productController.findById);
		/**
		 * Update an existing product
		 */
		// this.router.put('/:id', this.productController.updateById);
		/**
		 * Delete an existing product
		 */
		// this.router.delete('/', this.productController.deleteById);

		return this.router;
	}
}
