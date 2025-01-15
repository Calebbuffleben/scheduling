import ProductForm from "@/components/Inventory/ProductFormComponent/ProductFormComponent";
import { IProductFormInput } from "@/interfaces/IProductFormInput";


const RegisterProductPage = () => {
    const handleProductSubmit = (data: IProductFormInput) => {
        console.log('Form Submitted:', data);
    };
    return (      
          <ProductForm
            onSubmit={handleProductSubmit}
            initialValues={{
              name: 'Sample Product',
              sku: 'SKU123',
              price: '100',
              quantity: 10,
              description: 'A sample product',
            }}
          />
    );
};

export default RegisterProductPage;