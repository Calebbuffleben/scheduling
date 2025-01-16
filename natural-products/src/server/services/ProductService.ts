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
    async createProduct(data: any) {
        if (data.price < 0) {
            throw new Error('Price cannot be negative');
        }
      
        return await ProductRepository.create(data);
    },
    async updateProduct(id: string, data: any) {
        if(data.price < 0) {
            throw new Error('Price cannot be negative');
        }
        return await ProductRepository.update(id, data);
    }
};
export default { ProductService };