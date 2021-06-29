class AppError {
    public readonly message: string;

    public readonly statusCode: number; //400 500 401


    constructor(message: string, statusCode = 400){
        this.message = message;
        this.statusCode = statusCode;

    }
}

export default AppError;
