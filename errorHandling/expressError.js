class expressError extends Error{  //inheriting the properties from the Error class
    constructor(status, message){
        super();  //calling the parent class constructor
        this.status = status;
        this.message = message;
    }
}

module.exports = expressError;