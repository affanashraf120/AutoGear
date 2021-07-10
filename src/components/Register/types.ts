import * as yup from "yup";

export type RegisterData = {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postCode: string;
    password: string;
    confirmPassword: string;
};

export const defaultValues: RegisterData = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    state: "",
    postCode: "",
    confirmPassword: "",
};

export const schema = yup.object().shape({
    fullName: yup
        .string()
        .required("Fullname required")
        .matches(/^[A-Z][a-z]*(\s[A-Z][a-z]*)+$/, {
            message: "Enter full name. Use only alphabets. Contains atleast two words. Use Capital letter at start of word",
        })
        .min(8, "Name must contain more then or equal to 8 characters")
        .max(30, "Name must contain less then or equal to 30 characters"),
    email: yup.string().required("Email required").email("Email must be valid"),
    phone: yup.string().required("Phone number required").min(12, "Enter compelete phone number"),
    address: yup
        .string()
        .required("Address required")
        .min(16, "Address must be 16 characters long")
        .max(50, "Address should be less than 50 characters"),
    state: yup.string().required("Province required").min(2, "Minimum 2 characters long"),
    city: yup
        .string()
        .required("City required")
        .matches(/^[a-zA-Z]+$/, "Use only alphabets")
        .min(5, "Minimum 5 characters long")
        .max(25, "Contain less than or equal to 25 characters"),
    postCode: yup
        .string()
        .required("Postal code required")
        .matches(/^[0-9]*$/, "Use number only")
        .min(5, "Postal code must contain 5 number only")
        .max(5, "Postal code must contain 5 number only"),
    password: yup
        .string()
        .required("Password required")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            `Use atleast 8 characters.
    Use both upper and lowercase characters.
    Include atleast one number and symbol(# $ ! % & etc..)`
        ),
    confirmPassword: yup
        .string()
        .required("Confirm password required")
        .oneOf([yup.ref("password"), null], "Passwords does not match"),
});
