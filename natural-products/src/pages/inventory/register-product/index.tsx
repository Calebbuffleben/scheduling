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
              name: '',
              sku: '',
              price: '',
              quantity: 0,
              description: '',
            }}
          />
    );
};

export default RegisterProductPage;