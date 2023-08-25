
import { HttpServer } from "../infra/httpServer";
import express, { NextFunction, Request, Response } from 'express';
import https from 'https'
import { TLSSocket } from "tls";

const clientAuthMiddleware = () => (req:Request, res:Response, next:NextFunction) => {
    let tlsSocket = (req.socket as TLSSocket);
    if (!tlsSocket.authorized) {
      return res.status(401).send('Unauthorized');
    }
    return next();
  };

export default class HttpAxiosAdapter implements HttpServer{
   private app:any
   private httpsServer :https.Server 
    constructor(httpsOptions: any){
       this.app = express()
       this.app.use(express.json())
       this.app.use(express.urlencoded({ extended: false }));

       this.httpsServer = https.createServer(httpsOptions, this.app);       
       this.app.use(clientAuthMiddleware)
    
    }
    on(method: string, url: string, callback: (params:any, body:any)=>any): void {
        this.app[method](url, async (req:Request, res:Response) => {
            const output  = await callback(req.params, req.body)
            res.json(output)
        })
    }
    listen(port: number): void {
       this.httpsServer.listen(port)
    }
}

