import { Container } from "./styles";

const FormComponent = ({ onSubmit, handleSubmit, register, errors, inputs }) => (
    <Container>
        {inputs.map(
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Company Name */}
                <div>
                    <input 
                        type={inputs.text} 
                        placeholder={inputs.placeholder}
                        {...register(`${inputs.fieldName}`, inputs.isRequired && {required: 'This field is required'})}
                    />
                    {errors.companyName && <span>{errors.companyName.message}</span>}
                </div>
                {/* Submit Button */}
                <button type="submit">{inputs.buttonName}</button>
            </form>
        )}
    </Container>
);

export default FormComponent;