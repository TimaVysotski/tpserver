import bcrypt from "bcrypt";

export const BcryptMiddelware = {
    async createHash(password: any) {
        return await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    },
    async checkPassword(body: any, password: any) {
        return await bcrypt.compare(password, body.password);
    },
}