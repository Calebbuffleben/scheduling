import { useForm } from "react-hook-form";
import CompanyRegistrationComponent from "../../../components/CompanyRegistration/CompanyRegistrationComponent";
import { registerCompany } from '../../../services/companyService';

const CompanyRegistrationPage = () => {
    const { handleSubmit, register, formState: { errors }, reset } = useForm();
    const inputs = {

    };

    const onSubmit = async (data) => {
        try{
            const response = await registerCompany(data);
        
            console.log('Company registered successfully:', response.data);
            
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