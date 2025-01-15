import React from 'react'
import { useForm } from 'react-hook-form'

interface IProductFormInputs {
    name: string;
    sku: string;
    price: string;
    quantity: number;
    description: string;
}

interface IProductFormProps {
    onSubmit: (data: IProductFormInputs) => void;
    initialValues?: IProductFormInputs;
}

const ProductForm: React.FC<IProductFormProps> = ({ onSubmit, initialValues }) => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<IProductFormInputs>({
        defaultValues: initialValues
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='name'>
                    Nome do Produto:
                </label>
                <input {...register("name")} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <label htmlFor='sku'>
                    SKU:
                </label>
                <input {...register("sku")} />
                {errors.sku && <p>{errors.sku.message}</p>}
            </div>
            <div>
                <label htmlFor='price'>
                    Price:
                </label>
                <input
                    {...register("price")} 
                />
                {errors.price && <p>{errors.price.message}</p>}
            </div>
            <div>
                <label htmlFor='number'>
                    Quantity:
                </label>
                <input 
                    id="quantity"
                    type="number"
                    {...register('quantity', {
                      required: 'Quantity is required',
                      valueAsNumber: true,
                      min: { value: 0, message: 'Quantity must be at least 0' },
                    })}
                />
                {errors.quantity && <p>{errors.quantity.message}</p>}
            </div>
            <div>
                <label htmlFor='description'>
                    Description:
                </label>
                <textarea {...register("description")} />
                {errors.description && <p>{errors.description.message}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

