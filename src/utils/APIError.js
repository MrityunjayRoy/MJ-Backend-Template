class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.error = error
        this.stack = stack
    }
}

export { ApiError }