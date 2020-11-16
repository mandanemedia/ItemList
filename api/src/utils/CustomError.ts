import moment from 'moment';

export enum ErrorStatus {
    Bad_Request = 400, // Client sent an invalid request
    Unauthorized = 401, // Client failed to authenticate with the server
    Forbidden = 403, // Client authenticated but does not have permission to access the requested resource
    Not_Found = 404, // The requested resource does not exist
    Conflict = 409, // The request conflict with current state of the target resource
    Internal_Server = 500, // A generic error occurred on the server
    Service_Unavailable = 503, // Service Unavailable
}

class CustomError extends Error {
    constructor(status: ErrorStatus, errorMessage: string = '') {
        switch (status) {
        case ErrorStatus.Bad_Request: {
            super('Bad Request');
            this.status = status;
            break;
        }
        case ErrorStatus.Unauthorized: {
            super('Unauthorized');
            this.status = status;
            break;
        }
        case ErrorStatus.Forbidden: {
            super('Forbidden');
            this.status = status;
            break;
        }
        case ErrorStatus.Not_Found: {
            super('Not Found');
            this.status = status;
            break;
        }
        case ErrorStatus.Conflict: {
            super('Conflict');
            this.status = status;
            break;
        }
        case ErrorStatus.Internal_Server: {
            super('Internal Server');
            this.status = status;
            break;
        }
        case ErrorStatus.Service_Unavailable: {
            super('Internal Server');
            this.status = status;
            break;
        }
        default: {
            super('Internal Server');
            this.status = ErrorStatus.Internal_Server;
            break;
        }
        }

        Object.setPrototypeOf(this, new.target.prototype);
        this.type = this.message;
        this.errorMessage = errorMessage;
        this.timestamp = moment().format();
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;
