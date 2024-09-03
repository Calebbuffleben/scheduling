import { Container, Left, Right, ContainerRight } from "./styles";

const CompanyRegistrationComponent = ({ onSubmit, handleSubmit, register, errors }) => (
    <Container>
        <Left>
            
        </Left>
        <Right>
            <ContainerRight>
                <h2>Company Registration</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Company Name */}
                    <div>
                        <input 
                            type="text" 
                            placeholder="Company Name"
                            {...register('companyName', {required: 'Company name is required'})}
                        />
                        {errors.companyName && <span>{errors.companyName.message}</span>}
                    </div>
                    {/* Email */}
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

                    {/* Address */}
                    <div>
                        <input
                            type="text"
                            placeholder="Address"
                            {...register('address', {required: 'Adress is required'})}
                        />
                        {errors.address && <span>{errors.address.message}</span>}
                    </div>

                    {/* Phone Number */}
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

                    {/* Submit Button */}
                    <button type="submit">Register Company</button>
                </form>
            </ContainerRight>
        </Right>
    </Container>
);

export default CompanyRegistrationComponent;