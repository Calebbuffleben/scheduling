import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const ProductRepository = {
    async findAll() {
        return await prisma.product.findMany();
    },
    async findById(id: string) {
        return await prisma.product.findUnique({
            where: { id },
        });
    },
    async create(data: any) {
        return await prisma.product.create(data);
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