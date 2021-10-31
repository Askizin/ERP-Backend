class Error{
    public readonly statusCode: number;
    public readonly message: string;
    public readonly data?: any;

    constructor(message: string, statusCode = 400, data?:any){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default Error;