export const Validation = {
    notEmpty(body: any) {
        Object.keys(body).forEach(property => {
            if (!property) {
                throw `Request can not be consist of empty key.`;
            }
            if (!body[property]) {
                throw `Parameter ${property} can not be empty.`;
            }
        });
    },
    correctParameters(body: any) {
        this.checkUsername(body.username);
        this.checkPassword(body.password);
        this.checkGender(body.gender);
    },
    checkUsername(property: string){
        if (property.includes(' ')) {
            throw `Error! Check username data you entered. U can't use ' ' in your username.`;
        }
    },
    checkPassword(property: string){
        if (property.includes(' ')) {
            throw `Error! Check password data you entered. Incorrect symbol.`;
        }
    },
    checkGender(property: string) {
        if ((property != "male") && (property != "famale")) {
            throw `Error! Check gender data you entered.`;
        }
    }
}
