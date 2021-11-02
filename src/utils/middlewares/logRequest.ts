/* importo a rota express */
import {Request, Response, NextFunction} from 'express'


function logRequest(request: Request,responder: Response, next: NextFunction){
    const {method, url} = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;
    console.log(logLabel);
    console.time(logLabel);
    next();
    console.timeEnd(logLabel);
}

export { logRequest }