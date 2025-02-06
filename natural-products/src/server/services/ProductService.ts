import { IProductFormInput } from "@/interfaces/IProductFormInput";
import { ProductRepository } from "../database/ProductRepository";

export const ProductService = {
    async getAllProducts() {
        return await ProductRepository.findAll();
    },
    async getProductsById(id: string) {
        const product = await ProductRepository.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    },
    async createProduct(data: IProductFormInput) {
        return await ProductRepository.create(data);
    },
    async updateProduct(id: string, data: IProductFormInput) {
        return await ProductRepository.update(id, data);
    },
    async deleteProduct(id: string) {
        return await ProductRepository.delete(id);
    }
};
export default { ProductService };