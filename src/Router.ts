import { HttpServer } from "./infra/httpServer";
import Client from "./models/clients";

export default class Router {
    constructor(readonly httpServer:HttpServer, readonly clients: Client[]){}

    async init(){
        this.clients.forEach(client => {
            this.httpServer.on("POST", `${client.location}/webhook/pix`, (params, body) => {
              console.log({body});
            });
          });
    }
}