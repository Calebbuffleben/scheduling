import { Container } from "./styles";

const FormComponent = ({ onSubmit, handleSubmit, register, errors, inputs }) => (
    <Container>
        {inputs.map((input, index) =>{  
            
            if(input.type){
                return (
                    <div key={index}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Company Name */}
                            <div>
                                <input 
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    {...register(`${input.fieldName}`, {required: input.isRequired && 'This field is required'})}
                                />
                                {errors.companyName && <span>{errors.companyName.message}</span>}
                            </div>
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