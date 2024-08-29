import { useForm } from "react-hook-form";
import CompanyRegistrationComponent from "../../../components/CompanyRegistration/CompanyRegistrationComponent";
import { registerCompany } from '../../../services/companyService';

const CompanyRegistrationPage = () => {
    const { handleSubmit, register, formState: { errors }, reset } = useForm();

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
        <CompanyRegistrationComponent>
            <h2>Company Registration</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Company Name */}
                <div>
                    <label>Company name</label>
                    <input 
                        type="text" 
                        {...register('companyName', {required: 'Company name is required'})}
                    />
                    {errors.companyName && <span>{errors.companyName.message}</span>}
                </div>
                 {/* Email */}
                 <div>
                    <label>Email</label>
                    <input
                        type="email"
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

                 {/* Address */}
                 <div>
                    <label>Address</label>
                    <input
                        type="text"
                        {...register('address', {required: 'Adress is required'})}
                    />
                    {errors.address && <span>{errors.address.message}</span>}
                 </div>

                {/* Phone Number */}
                <div>
                   <label>Phone number</label>
                   <input
                        type="tel"
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

                {/* Submit Button */}
                <button type="submit">Register Company</button>
            </form>
        </CompanyRegistrationComponent>
    )
}

export default CompanyRegistrationPage;