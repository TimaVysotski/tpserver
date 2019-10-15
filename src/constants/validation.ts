export enum Gender {
    Male = "male",
    Female = "female",
};

export const validUsername = /^[a-z0-9A-Z_-]{3,16}$/;
export const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}$/;
export const validEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
