import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export type TCompanyFormInputs = {
    companyName: TField;
    email: TField;
    address: TField;
    phoneNumber?: TField;
    button?: TButton;
};

export type TCompany = {
    onSubmit: (data: TCompanyFormInputs) => void;
    handleSubmit: UseFormHandleSubmit<TCompanyFormInputs>;
    register: UseFormRegister<TCompanyFormInputs>;
    errors: FieldErrors<TCompanyFormInputs>;
    inputs: TField[];
}

export type TInputField = {
    type: string; 
    placeholder: string; 
    fieldName: keyof TCompanyFormInputs; 
    isRequired: boolean; 
};

export type TField = TInputField | TButton;

export type TButton = {
    buttonName?: string;
}