class ApiResponse {
    constructor(obj, message) {
        this.result = obj;
        this.isSuccess = true;
        this.message = message || null;
    }
}

module.exports = ApiResponse;