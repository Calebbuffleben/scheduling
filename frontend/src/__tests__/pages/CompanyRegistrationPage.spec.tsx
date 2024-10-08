import '@testing-library/jest-dom';
import CompanyRegistrationPage from '../../pages/Registers/company-register';
import { fireEvent, render, screen } from '@testing-library/react';

describe("Handle with api and http responses", () => {
    test("The function is being called when click at the button", () => {
        const handleClick = jest.fn();

        render( <CompanyRegistrationPage />)

        const button = screen.getByText("Register Company")
        fireEvent.click(button)

        expect(handleClick).toHaveBeenCalledTimes(1);
    })
})