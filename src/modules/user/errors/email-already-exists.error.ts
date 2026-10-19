export class EmailAlreadyExistsError extends Error {
    constructor() {
        super(`O email informado já está em uso. Por favor, utilize outro email.`);
        this.name = 'EmailAlreadyExistsError';
    }
}