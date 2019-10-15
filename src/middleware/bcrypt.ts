import bcrypt from "bcrypt";
import { IUserBase } from "../interfaces/user";
import { CREDENTIALS_ERROR } from "../constants/api";

const BcryptMiddelware = {
    createHash(password: string) {
        return bcrypt.hash(password, Number(process.env.SALT_ROUNDSs));
    },
    async checkPassword(user: IUserBase, password: string) {
        const result = await bcrypt.compare(password, user.password!);
        if (result) { return result; } else { throw CREDENTIALS_ERROR; }
    },
};

export default BcryptMiddelware;
