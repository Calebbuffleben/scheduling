import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import FormComponent from "../ui/FormComponent/FormComponent";
import { Container, Left, Right, ContainerRight } from "./styles";

type TCompanyFormInputs = {
    companyName: string;
    email: string;
    address: string;
    phoneNumber: string;
};

type TCompany = {
    onSubmit: () => void;
    handleSubmit: UseFormHandleSubmit<TCompanyFormInputs>;
    register: UseFormRegister<TCompanyFormInputs>;
    errors: FieldErrors<TCompanyFormInputs>;
}

const CompanyRegistrationComponent = ({ onSubmit, handleSubmit, register, errors, inputs }) => (
    <Container>
        <Left />
        <Right>
            <ContainerRight>
                <h2>Company Registration</h2>

                <FormComponent onSubmit={onSubmit} 
                    handleSubmit={handleSubmit} 
                    register={register} 
                    errors={errors} 
                    inputs={inputs} 
                />
               {/* <form onSubmit={handleSubmit(onSubmit)}>
    
                    <div>
                        <input 
                            type="text" 
                            placeholder="Company Name"
                            {...register('companyName', {required: 'Company name is required'})}
                        />
                        {errors.companyName && <span>{errors.companyName.message}</span>}
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Enter a valid email address'
                                }
                            })}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Address"
                            {...register('address', {required: 'Adress is required'})}
                        />
                        {errors.address && <span>{errors.address.message}</span>}
                    </div>
                    <div>
                    <input
                            type="tel"
                            placeholder="Phone Number"
                            {...register('phoneNumber', {
                                required: 'Phone Number is required',
                                pattern: {
                                    value: /^\d{10,15}$/,
                                    message: 'Enter a valid phone number'
                                }
                            })}
                        />
                        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>} 
                    </div>
                    <button type="submit">Register Company</button>
                </form> */}
            </ContainerRight>
        </Right>
    </Container>
);

export default CompanyRegistrationComponent;