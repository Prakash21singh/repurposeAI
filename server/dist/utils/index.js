"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
class ResponseUtil {
    constructor() { }
    static success(data, message) {
        return {
            data,
            message,
            success: true,
        };
    }
    static error(message, statusCode) {
        return {
            message,
            statusCode,
            success: false,
        };
    }
}
exports.ResponseUtil = ResponseUtil;
