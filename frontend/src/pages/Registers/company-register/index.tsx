import { useForm } from "react-hook-form";

import { registerCompany } from '../../../services/companyService';

import { TCompanyFormInputs, TField } from "../../../types/CompanyForm";

import CompanyRegistrationComponent from "../../../components/CompanyRegistration/CompanyRegistrationComponent";

const CompanyRegistrationPage = () => {
    const { handleSubmit, register, formState: { errors }, reset } = useForm<TCompanyFormInputs>();
    const inputs: TField[] = [
        {
            type: "text",
            placeholder: "Company Name",
            fieldName: "companyName",
            isRequired: true,
        },
        {
            type: "email",
            placeholder: "Email",
            fieldName: "email",
            isRequired: true,
        },
        {
            type: "text",
            placeholder: "Company City",
            fieldName: "companyCity",
            isRequired: true,
        }, 
        {
            type: "text",
            placeholder: "Address",
            fieldName: "address",
            isRequired: true,
        },
        {
            type: "text",
            placeholder: "Address Number",
            fieldName: "addressNumber",
            isRequired: false,
        },
        {
            type: "text",
            placeholder: "Complement",
            fieldName: "complement",
            isRequired: false,
        },
        {
            type: "text",
            placeholder: "Website",
            fieldName: "website",
            isRequired: false,
        },
        {
            type: "text",
            placeholder: "Phone number",
            fieldName: "phoneNumber",
            isRequired: false,
        },  
        {
            buttonName: "Register Company"
        }
    ];

    const onSubmit = async (values: TCompanyFormInputs) => {
        try{
            const { data }   = await registerCompany(values);
        
            console.log('Company registered successfully:', data);
            
            // Reset form fields after successful submission
            reset();
        } catch (error) {
            console.error('Error registering company:', error);
        }
    }

    return (
        <CompanyRegistrationComponent 
            onSubmit={onSubmit} 
            handleSubmit={handleSubmit} 
            register={register} 
            errors={errors}
            inputs={inputs}
        />
    )
}

export default CompanyRegistrationPage;