import { FC } from "react";
import { FieldErrors, UseFormRegister, SubmitHandler, UseFormHandleSubmit, FieldValues } from "react-hook-form";
import { Container } from "./styles";

type TInputField = {
    type?: string;
    placeholder?: string;
    fieldName: keyof FieldValues; // Keys from form values
    isRequired?: boolean;
    buttonName?: string; // Optional for submit button
}

type TFormComponentProps = {
    onSubmit: SubmitHandler<FieldValues>;
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    inputs: TInputField[];
  }

const FormComponent: FC<TFormComponentProps> = ({ 
    onSubmit, 
    handleSubmit, 
    register, 
    errors, 
    inputs 
}) => (
    <Container>
        {inputs.map((input, index) =>{  
            
            if(input.type){
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