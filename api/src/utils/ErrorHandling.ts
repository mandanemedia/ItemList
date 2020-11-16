import CustomError from './CustomError';

const ErrorHandling = (err, req, res, next) => {
    const errorResponse = { ...err };
    errorResponse.instance = `${req.get('host')}${req.originalUrl}`;

    // add body if exist in the request
    // if (Object.keys(req.body).length !== 0) {
    //     errorResponse.body = req.body;
    // }

    // TODO 'trace' should be disable for production environment
    const trace = `${err.stack.split('\n').slice(1, 2).join('').split('/')
        .slice(-1)}`;
    errorResponse.trace = `${trace.split('.').slice(0, 1).join('')
    }:${trace.split(':').slice(1, 2).join('')}`;

    console.log(errorResponse);

    if (err instanceof CustomError) {
        res.status(err.status).send({ error: errorResponse });
    } else if (err.statusCode) { // joi error
        res.status(err.status).send({ error: err });
    } else {
        res.status(500).send({ error: err });
    }
};

export default ErrorHandling;
