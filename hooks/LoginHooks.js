import {useState} from 'react';
const validation = {
    confirmPassword: {
        equality: "password"
    },
    username: {
        presence: {
            message: '^Please enter a username address'
        },
        length: {
            minimum: 3,
            message: '^Your username must be at least 3 characters'
        },
        format: {
            pattern: "[a-z0-9]+",
            flags: "i",
            message: "can only contain a-z and 0-9"
        }
    },

    email: {
        presence: {
            message: '^Please enter an email address'
        },
        email: {
            pattern: '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$',
            message: '^Please enter a valid email address'
        }
    },

    password: {
        presence: {
            message: '^Please enter your password'
        },
        length: {
            minimum: 5,
            message: '^Your password must be at least 5 characters'
        }
    },

    full_name: {
        presence: {
            message: '^Please enter your fullName'
        },
        length: {
            minimum: 5,
            message: '^Your fullName must be at least 5 characters'
        },
        format: {
            pattern: '^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$',
            flags: "i",
            message: "^Write a valid fullName"
        }
    },
};

const useSignUpForm = () => {
    const emptyError = {
        username: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
        full_name: undefined,
        fetch: undefined,
    };
    const [inputs, setInputs] = useState({});
    const [errors, setError] = useState(emptyError);

    const handleUsernameChange = (text) => {
        setInputs((inputs) =>
            ({
                ...inputs,
                username: text,
            }));
    };
    const handlePasswordChange = (text) => {
        setInputs((inputs) =>
            ({
                ...inputs,
                password: text,
            }));
    };
    const handleEmailChange = (text) => {
        setInputs((inputs) =>
            ({
                ...inputs,
                email: text,
            }));
    };
    const handleFullNameChange = (text) => {
        setInputs((inputs) =>
            ({
                ...inputs,
                full_name: text,
            }));
    };
    return {
        handleUsernameChange,
        handlePasswordChange,
        handleEmailChange,
        handleFullNameChange,
        inputs,
        errors,
        setError,
    };
};


export {useSignUpForm, validation};