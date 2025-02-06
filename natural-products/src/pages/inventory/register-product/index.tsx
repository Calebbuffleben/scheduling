import ProductForm from "@/components/Inventory/ProductFormComponent/ProductFormComponent";
import { IProductFormInput } from "@/interfaces/IProductFormInput";
import api from "@/api-connection/service";

const RegisterProductPage = () => {
    const handleProductSubmit = async (data: IProductFormInput) => {
      console.log('Form Submitted:', data);
      const response = await api.post('/products', data);
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