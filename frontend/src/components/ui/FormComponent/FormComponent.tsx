import { FC } from "react";
import { TCompany } from "../../../types/CompanyForm";
import { Container } from "./styles";

const FormComponent: FC<TCompany> = ({ 
    onSubmit, 
    handleSubmit, 
    register, 
    errors, 
    inputs 
}) => (
    <Container>
        {inputs.map((input, index) =>{  
            
            if('type' in input){
                return (
                    <div key={index}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input 
                                type={input.type}
                                placeholder={input.placeholder}
                                {...register(`${input.fieldName}`, {required: input.isRequired && 'This field is required'})}
                            />
                            {errors?.[input.fieldName] && <span>{(errors?.[input.fieldName]?.message as string)}</span>}
                        </form>
                    </div>
                )
            }

            if (input.buttonName){
                return (
                    <div key={index}>
                        {/* Submit Button */}
                        <button type="submit">{input.buttonName}</button>
                    </div>
                );
            }
        })}
    </Container>
);

export default FormComponent;