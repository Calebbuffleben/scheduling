import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Product = {
    name: string;
    price: string;
    quantity: number;
};
export const ProductRepository = {
    async findAll() {
        return await prisma.product.findMany();
    },
    async findById(id: string) {
        return await prisma.product.findUnique({
            where: { id },
        });
    },
    async create(productData: Product) {
        console.log("Aqui ", prisma);
        return await await prisma.product.create({
            data: {
                ...productData
            }
        });
    },
    async update(id: string, data: Partial<{ name: string; price: string; quantity: number }>) {
        return await prisma.product.update({
            where: { id },
            data,
        });
    },
    async delete(id: string) {
        return await prisma.product.delete({
            where: { id },
        });
    }

}