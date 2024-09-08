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
    inputs: TCompanyFormInputs;
}

const CompanyRegistrationComponent = ({ onSubmit, handleSubmit, register, errors, inputs }: TCompany) => (
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
            </ContainerRight>
        </Right>
    </Container>
);

export default CompanyRegistrationComponent;