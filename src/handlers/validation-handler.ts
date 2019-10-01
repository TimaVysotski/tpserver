export default class ValidationHandler {
    notEmpty(...params: Array<any>) {
        params.forEach(property => {
            if (!property) {
                throw 'Error!!! Empty param!';
            }
        })
    }
}
