import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FormComponent from '../../components/ui/FormComponent/FormComponent';

const mockInputs = [
    { type: 'text', placeholder: 'Company Name', fieldName: 'companyName', isRequired: true },
    { buttonName: 'Register Company' }
];

const mockRegister = jest.fn();
const mockHandleSubmit = jest.fn((fn) => fn);
const mockOnSubmit = jest.fn();
const mockErrors = {};

describe('Form Component', () => {
    test('Verify if the inputs are rendering in the screen with fields and button', () => {
        render(
            <FormComponent 
                onSubmit={mockOnSubmit}
                handleSubmit={mockHandleSubmit}
                register={mockRegister}
                errors={mockErrors}
                inputs={mockInputs}
            />
        );

        //Check if input is rendered
        const inputELement = screen.getByPlaceholderText('Company Name');
        expect(inputELement).toBeInTheDocument();

        const buttonElement = screen.getByText("Register Company");
        expect(buttonElement).toBeInTheDocument();
    });
});

