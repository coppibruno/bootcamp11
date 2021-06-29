import { ValidationError } from 'yup';

interface Errors {
    [key: string]: string;
}

export default function getValidationErrors(err: any): Errors {
    let validationErrors: Errors = {};

    err.forEach((error: any) => {
        validationErrors[error.path] = error.message;
    });

    return validationErrors;
}
