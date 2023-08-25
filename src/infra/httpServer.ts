

export interface HttpServer{
    on(method:string, url:string, callback:(params:any, body:any)=>void ):void
    listen(port: number): void;
}