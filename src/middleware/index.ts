import bcrypt from "bcrypt";

export const Middelware = {
    async createHash(password: any) {
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS as string));
        return hashedPassword;
    },
    async checkPassword(body: any, password: any) {
        const isAuthentication = await bcrypt.compare(password, body.password);
        return isAuthentication;
    },
}