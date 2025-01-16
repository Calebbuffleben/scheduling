import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI || '');
const db = client.db('inventory');
const productCollection = db.collection('products');

export const ProductRepository = {
    async findAll() {
        return await productCollection.find().toArray();
    },
    async findById(id: string) {
        return await productCollection.findOne({ _id: new ObjectId(id) });
    },
    async create(data: any) {
        const result = await productCollection.insertOne(data);
        return result.insertedId;
        
    },
    async update(id: string, data: any) {
        return await productCollection.updateOne({ _id: new ObjectId(id) }, { $set: data });
    },
    async delete(id: string) {
        return await productCollection.deleteOne({ _id: new ObjectId(id) });
    }

}