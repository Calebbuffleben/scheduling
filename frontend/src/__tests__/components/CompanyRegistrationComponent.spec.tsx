import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CompanyRegistrationComponent from '../../components/CompanyRegistration/CompanyRegistrationComponent';

const mockInputs = [
    { type: 'text', placeholder: 'Company Name', fieldName: 'companyName', isRequired: true },
    { buttonName: 'Register Company' }
];

const mockRegister = jest.fn();
const mockHandleSubmit = jest.fn((fn) => fn);
const mockOnSubmit = jest.fn();
const mockErrors = {};

describe("The form and the title should be shown ", () => {
    test("The title should be shown", () => {
        render (
            <CompanyRegistrationComponent
                onSubmit={mockOnSubmit}
                handleSubmit={mockHandleSubmit}
                register={mockRegister}
                errors={mockErrors}
                inputs={mockInputs}
            />
        )
        const title = screen.getByText("Company Registration");
        expect(title).toBeInTheDocument();
    })
})