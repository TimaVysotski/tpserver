export enum Gender {
    Male = "male",
    Female = "female",
};
export const validUsername = /^[a-z0-9_-]{3,16}$/;
export const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}$/;
export const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;