import { readFileSync } from "fs";
import Router from "./Router";
import HttpAxiosAdapter from "./adapters/HttpAxiosAdapter";
import Client from "./models/clients";
import { ServerOptions } from "https";

const domain_cert = readFileSync(".\\cas\\domain.crt");
const domain_key = readFileSync(".\\cas\\domain.key");

const sicredi = new Client("Sicredi", "sicredi", ".\\cas\\ca_sicredi.cer");
const gerencianet = new Client(
  "Gerencianet",
  "gerencianet",
  ".\\cas\\ca_gerencianet_sandbox.crt"
);
const gerencianet_sandbox = new Client(
  "Gerencianet Sandbox",
  "gerencianet_sandbox",
  ".\\cas\\ca_gerencianet_sandbox.crt"
);

const clients: Client[] = [sicredi, gerencianet, gerencianet_sandbox];

const cas = clients.map((client) => client.ca);

const httpsOptions: ServerOptions = {
  cert: domain_cert,
  key: domain_key,
  ca: cas,
  minVersion: "TLSv1.2",
  requestCert: true,
  rejectUnauthorized: false,
};

const htttpServer = new HttpAxiosAdapter(httpsOptions);
const router = new Router(htttpServer, clients);

router.init();

htttpServer.listen(3000);
